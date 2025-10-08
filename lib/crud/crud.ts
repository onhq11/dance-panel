import { db } from "../db";

export type BelongsTo = {
  type: "belongsTo";
  table: string; // e.g. "age_group"
  alias: string; // e.g. "age_group"
  localKey: string; // e.g. "age_group_id" on base table
  foreignKey: string; // e.g. "id" on related table
  selectable: readonly string[]; // columns from related table
};

export type HasMany = {
  type: "hasMany";
  table: string; // e.g. "registration"
  alias: string; // e.g. "registrations"
  foreignKey: string; // e.g. "participant_id" (points to base id)
  selectable: readonly string[]; // columns from related table
  orderBy?: string;
  orderDir?: "asc" | "desc";
  limitPerParent?: number; // optional cap per parent (applied after group)
};

export type Relation = BelongsTo | HasMany;

export type CrudConfig = {
  table: string;
  id?: string;
  selectable: readonly string[];
  editable: readonly string[];
  search?: readonly string[];
  defaultOrderBy?: string;
  defaultOrderDir?: "asc" | "desc";
  maxLimit?: number;
  relations?: readonly Relation[];
};

const q = (x: string) => `\`${x}\``;

function buildBelongsToJoins(cfg: CrudConfig) {
  const joins: string[] = [];
  const selectPieces: string[] = [];
  for (const r of cfg.relations ?? []) {
    if (r.type !== "belongsTo") continue;
    joins.push(
      `LEFT JOIN ${q(r.table)} AS ${q(r.alias)} ON ${q(cfg.table)}.${q(r.localKey)} = ${q(r.alias)}.${q(r.foreignKey)}`,
    );
    for (const col of r.selectable) {
      // alias: age_group.name -> age_group__name
      selectPieces.push(
        `${q(r.alias)}.${q(col)} AS ${q(`${r.alias}__${col}`)}`,
      );
    }
  }
  return { joins, selectPieces };
}

export type IdPromise = { params: Promise<{ id: string }> };

// tiny guard so we only allow known identifiers
const isAllowed = (col: string, allow: readonly string[]) =>
  allow.includes(col);

// produce backticked identifiers after allowlist check
const ident = (col: string, allow: readonly string[]) => {
  if (!isAllowed(col, allow)) throw new Error(`Invalid column: ${col}`);
  return `\`${col}\``;
};

const dir = (v?: string) => (v?.toLowerCase() === "desc" ? "DESC" : "ASC");

const toPlaceholders = (n: number) => Array(n).fill("?").join(",");

function pickEditable(
  payload: Record<string, any>,
  editable: readonly string[],
) {
  const out: Record<string, any> = {};
  for (const k of editable) if (payload[k] !== undefined) out[k] = payload[k];
  return out;
}

export function createCrudHandlers(cfg: CrudConfig) {
  const idCol = cfg.id ?? "id";
  const maxLimit = cfg.maxLimit ?? 100;
  const defaultOrderBy = cfg.defaultOrderBy ?? idCol;
  const defaultOrderDir = cfg.defaultOrderDir ?? "desc";

  const GET = async (req: Request) => {
    try {
      const { searchParams } = new URL(req.url);
      const qstr = searchParams.get("q") ?? "";
      const limit = Math.min(Number(searchParams.get("limit") ?? 20), maxLimit);
      const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
      const offset = (page - 1) * limit;
      const orderByRaw = searchParams.get("orderBy") ?? defaultOrderBy;
      const orderDir =
        (searchParams.get("orderDir") ?? defaultOrderDir).toLowerCase() ===
        "desc"
          ? "DESC"
          : "ASC";

      const whereParts: string[] = [];
      const whereValues: any[] = [];
      if (qstr && cfg.search?.length) {
        const like = `%${qstr}%`;
        whereParts.push(
          "(" +
            cfg.search
              .map((c) => `${q(cfg.table)}.${q(c)} LIKE ?`)
              .join(" OR ") +
            ")",
        );
        whereValues.push(...cfg.search.map(() => like));
      }
      const whereSQL = whereParts.length
        ? `WHERE ${whereParts.join(" AND ")}`
        : "";

      // belongsTo SELECT + JOINs
      const { joins, selectPieces } = buildBelongsToJoins(cfg);
      const baseSelect = [
        ...cfg.selectable.map((c) => `${q(cfg.table)}.${q(c)}`),
        ...selectPieces,
      ].join(",");

      // fetch page
      const [rows] = await db.query(
        `SELECT ${baseSelect}
         FROM ${q(cfg.table)}
         ${joins.join(" ")}
         ${whereSQL}
         ORDER BY ${q(cfg.table)}.${q(orderByRaw)} ${orderDir}
         LIMIT ? OFFSET ?`,
        [...whereValues, limit, offset],
      );

      // total
      const [cntRows] = await db.query(
        `SELECT COUNT(*) AS total FROM ${q(cfg.table)} ${whereSQL}`,
        whereValues,
      );
      const total = Array.isArray(cntRows)
        ? ((cntRows as any)[0]?.total ?? 0)
        : 0;

      const list = Array.isArray(rows) ? (rows as any[]) : [];

      // map inline belongsTo into nested object
      for (const r of cfg.relations ?? []) {
        if (r.type !== "belongsTo") continue;
        for (const row of list) {
          const nested: any = {};
          for (const col of r.selectable) {
            const key = `${r.alias}__${col}`;
            nested[col] = row[key];
            delete row[key];
          }
          row[r.alias] = nested;
        }
      }

      // batch fetch hasMany and attach
      const hasMany = (cfg.relations ?? []).filter(
        (r) => r.type === "hasMany",
      ) as HasMany[];
      if (hasMany.length && list.length) {
        const ids = list
          .map((r) => r[idCol])
          .filter((v) => v !== null && v !== undefined);
        for (const rel of hasMany) {
          // fetch all children for listed parents
          const [childRows] = await db.query(
            `SELECT ${rel.selectable.map((c) => q(c)).join(",")}, ${q(rel.foreignKey)} AS ${q("_fk")}
             FROM ${q(rel.table)}
             WHERE ${q(rel.foreignKey)} IN (${Array(ids.length).fill("?").join(",")})
             ${rel.orderBy ? `ORDER BY ${q(rel.orderBy)} ${rel.orderDir?.toUpperCase() === "DESC" ? "DESC" : "ASC"}` : ""}`,
            ids,
          );
          const grouped = new Map<any, any[]>();
          for (const cr of childRows as any[]) {
            const fk = cr._fk;
            delete cr._fk;
            if (!grouped.has(fk)) grouped.set(fk, []);
            grouped.get(fk)!.push(cr);
          }
          for (const row of list) {
            let arr = grouped.get(row[idCol]) ?? [];
            if (rel.limitPerParent && arr.length > rel.limitPerParent) {
              arr = arr.slice(0, rel.limitPerParent);
            }
            row[rel.alias] = arr;
          }
        }
      }

      return Response.json({ data: list, meta: { page, limit, total } });
    } catch (e: any) {
      return new Response(e.message ?? "GET failed", { status: 400 });
    }
  };

  const POST = async (req: Request) => {
    try {
      const payload = await req.json();
      const data: Record<string, any> = {};
      for (const k of cfg.editable)
        if (payload[k] !== undefined) data[k] = payload[k];
      if (!Object.keys(data).length)
        throw new Error("No editable fields provided.");
      const cols = Object.keys(data);
      const vals = Object.values(data);
      const [res] = await db.query(
        `INSERT INTO ${q(cfg.table)} (${cols.map(q).join(",")}) VALUES (${Array(cols.length).fill("?").join(",")})`,
        vals,
      );
      const insertId = (res as any).insertId;
      return Response.json({ id: insertId }, { status: 201 });
    } catch (e: any) {
      return new Response(e.message ?? "POST failed", { status: 400 });
    }
  };

  return { GET, POST };
}

export function createCrudHandlersById(cfg: CrudConfig) {
  const idCol = cfg.id ?? "id";

  const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    try {
      const idVal = params.id;

      // belongsTo inline
      const { joins, selectPieces } = buildBelongsToJoins(cfg);
      const baseSelect = [
        ...cfg.selectable.map((c) => `${q(cfg.table)}.${q(c)}`),
        ...selectPieces,
      ].join(",");

      const [rows] = await db.query(
        `SELECT ${baseSelect}
         FROM ${q(cfg.table)}
         ${joins.join(" ")}
         WHERE ${q(cfg.table)}.${q(idCol)} = ?`,
        [idVal],
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : null;
      if (!row) return new Response("Not found", { status: 404 });

      // inline belongsTo -> nested
      for (const r of cfg.relations ?? []) {
        if (r.type !== "belongsTo") continue;
        const nested: any = {};
        for (const col of r.selectable) {
          const key = `${r.alias}__${col}`;
          nested[col] = row[key];
          delete row[key];
        }
        row[r.alias] = nested;
      }

      // hasMany fetch
      const hasMany = (cfg.relations ?? []).filter(
        (r) => r.type === "hasMany",
      ) as HasMany[];
      for (const rel of hasMany) {
        const [childRows] = await db.query(
          `SELECT ${rel.selectable.map((c) => q(c)).join(",")}
           FROM ${q(rel.table)}
           WHERE ${q(rel.foreignKey)} = ?
           ${rel.orderBy ? `ORDER BY ${q(rel.orderBy)} ${rel.orderDir?.toUpperCase() === "DESC" ? "DESC" : "ASC"}` : ""}`,
          [idVal],
        );
        let arr = childRows as any[];
        if (rel.limitPerParent && arr.length > rel.limitPerParent) {
          arr = arr.slice(0, rel.limitPerParent);
        }
        row[rel.alias] = arr;
      }

      return Response.json({ data: row });
    } catch (e: any) {
      return new Response(e.message ?? "GET failed", { status: 400 });
    }
  };

  const PATCH = async (
    _req: Request,
    { params }: { params: { id: string } },
  ) => {
    try {
      const idVal = params.id;
      const payload = await _req.json();
      const data: Record<string, any> = {};
      for (const k of cfg.editable)
        if (payload[k] !== undefined) data[k] = payload[k];
      if (!Object.keys(data).length)
        throw new Error("No editable fields provided.");

      const sets = Object.keys(data)
        .map((c) => `${q(c)} = ?`)
        .join(", ");
      const values = [...Object.values(data), idVal];

      await db.query(
        `UPDATE ${q(cfg.table)} SET ${sets} WHERE ${q(idCol)} = ?`,
        values,
      );
      return GET(_req, { params }); // return fresh with relations
    } catch (e: any) {
      return new Response(e.message ?? "PATCH failed", { status: 400 });
    }
  };

  const DELETE = async (
    _req: Request,
    { params }: { params: { id: string } },
  ) => {
    try {
      const idVal = params.id;
      const [res] = await db.query(
        `DELETE FROM ${q(cfg.table)} WHERE ${q(idCol)} = ?`,
        [idVal],
      );
      const affected = (res as any).affectedRows ?? 0;
      return affected
        ? new Response(null, { status: 204 })
        : new Response("Not found", { status: 404 });
    } catch (e: any) {
      return new Response(e.message ?? "DELETE failed", { status: 400 });
    }
  };

  return { GET, PATCH, DELETE };
}
