import { db } from "../db";

// Types to keep things tidy
export type CrudConfig = {
  table: string; // "participants"
  id?: string; // primary key column; default "id"
  selectable: readonly string[]; // columns allowed to SELECT
  editable: readonly string[]; // columns allowed to INSERT/UPDATE
  search?: readonly string[]; // columns to LIKE-search across
  defaultOrderBy?: string; // must be in selectable
  defaultOrderDir?: "asc" | "desc";
  maxLimit?: number; // cap to avoid full-table scans
};

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

  // GET /collection (list) with ?q=&limit=&page=&orderBy=&orderDir=
  const GET = async (req: Request) => {
    try {
      const { searchParams } = new URL(req.url);
      const q = searchParams.get("q") ?? "";
      const limit = Math.min(Number(searchParams.get("limit") ?? 20), maxLimit);
      const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
      const offset = (page - 1) * limit;
      const orderByRaw = searchParams.get("orderBy") ?? defaultOrderBy;
      const orderBy = ident(orderByRaw, [idCol, ...cfg.selectable]);
      const orderDir = dir(searchParams.get("orderDir") ?? defaultOrderDir);

      const whereParts: string[] = [];
      const whereValues: any[] = [];

      if (q && cfg.search?.length) {
        const like = `%${q}%`;
        whereParts.push(
          "(" +
            cfg.search
              .map((c) => `${ident(c, cfg.selectable)} LIKE ?`)
              .join(" OR ") +
            ")",
        );
        whereValues.push(...cfg.search.map(() => like));
      }

      const whereSQL = whereParts.length
        ? `WHERE ${whereParts.join(" AND ")}`
        : "";

      const [rows] = await db.query(
        `SELECT ${cfg.selectable.map((c) => ident(c, cfg.selectable)).join(",")}
         FROM \`${cfg.table}\`
         ${whereSQL}
         ORDER BY ${orderBy} ${orderDir}
         LIMIT ? OFFSET ?`,
        [...whereValues, limit, offset],
      );

      // total count for pagination
      const [cntRows] = await db.query(
        `SELECT COUNT(*) AS total FROM \`${cfg.table}\` ${whereSQL}`,
        whereValues,
      );

      const total = Array.isArray(cntRows)
        ? ((cntRows as any)[0]?.total ?? 0)
        : 0;

      return Response.json({ data: rows, meta: { page, limit, total } });
    } catch (e: any) {
      return new Response(e.message ?? "GET failed", { status: 400 });
    }
  };

  // POST /collection  body: { ...editable }
  const POST = async (req: Request) => {
    try {
      const payload = await req.json();
      const data = pickEditable(payload, cfg.editable);
      if (!Object.keys(data).length)
        throw new Error("No editable fields provided.");

      const cols = Object.keys(data);
      const values = Object.values(data);

      const [result] = await db.query(
        `INSERT INTO \`${cfg.table}\` (${cols.map((c) => ident(c, cfg.editable)).join(",")})
         VALUES (${toPlaceholders(cols.length)})`,
        values,
      );

      // Return inserted row (if PK available)
      const insertId = (result as any).insertId;
      if (insertId != null) {
        const [rows] = await db.query(
          `SELECT ${cfg.selectable.map((c) => ident(c, cfg.selectable)).join(",")}
           FROM \`${cfg.table}\`
           WHERE ${ident(idCol, [idCol, ...cfg.selectable])} = ?`,
          [insertId],
        );
        return Response.json(
          { data: Array.isArray(rows) ? rows[0] : null },
          { status: 201 },
        );
      }

      return new Response(null, { status: 201 });
    } catch (e: any) {
      return new Response(e.message ?? "POST failed", { status: 400 });
    }
  };

  // PATCH /collection?id=123  body: { ...editable }
  const PATCH = async (req: Request) => {
    try {
      const { searchParams } = new URL(req.url);
      const idVal = searchParams.get("id");
      if (!idVal) throw new Error(`Missing "${idCol}" query param.`);

      const payload = await req.json();
      const data = pickEditable(payload, cfg.editable);
      if (!Object.keys(data).length)
        throw new Error("No editable fields provided.");

      const sets = Object.keys(data)
        .map((c) => `${ident(c, cfg.editable)} = ?`)
        .join(", ");
      const values = [...Object.values(data), idVal];

      await db.query(
        `UPDATE \`${cfg.table}\`
         SET ${sets}
         WHERE ${ident(idCol, [idCol, ...cfg.selectable])} = ?`,
        values,
      );

      const [rows] = await db.query(
        `SELECT ${cfg.selectable.map((c) => ident(c, cfg.selectable)).join(",")}
         FROM \`${cfg.table}\`
         WHERE ${ident(idCol, [idCol, ...cfg.selectable])} = ?`,
        [idVal],
      );

      return Response.json({ data: Array.isArray(rows) ? rows[0] : null });
    } catch (e: any) {
      return new Response(e.message ?? "PATCH failed", { status: 400 });
    }
  };

  // DELETE /collection?id=123
  const DELETE = async (req: Request) => {
    try {
      const { searchParams } = new URL(req.url);
      const idVal = searchParams.get("id");
      if (!idVal) throw new Error(`Missing "${idCol}" query param.`);

      await db.query(
        `DELETE FROM \`${cfg.table}\`
         WHERE ${ident(idCol, [idCol, ...cfg.selectable])} = ?`,
        [idVal],
      );

      return new Response(null, { status: 204 });
    } catch (e: any) {
      return new Response(e.message ?? "DELETE failed", { status: 400 });
    }
  };

  return { GET, POST, PATCH, DELETE };
}

export function createCrudHandlersById(cfg: CrudConfig) {
  const idCol = cfg.id ?? "id";

  const GET = async (_req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const [rows] = await db.query(
        `SELECT ${cfg.selectable.map((c) => `\`${c}\``).join(",")}
         FROM \`${cfg.table}\` WHERE \`${idCol}\` = ?`,
        [id],
      );
      const dataOut = Array.isArray(rows) ? (rows as any)[0] : null;
      return dataOut
        ? Response.json({ data: dataOut })
        : new Response("Not found", { status: 404 });
    } catch (e: any) {
      return new Response(e.message ?? "GET failed", { status: 400 });
    }
  };

  const PATCH = async (_req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const payload = await _req.json();
      const data = Object.fromEntries(
        cfg.editable
          .filter((k) => payload[k] !== undefined)
          .map((k) => [k, payload[k]]),
      );
      if (!Object.keys(data).length)
        throw new Error("No editable fields provided.");

      const sets = Object.keys(data)
        .map((c) => `\`${c}\` = ?`)
        .join(", ");
      const values = [...Object.values(data), id];

      await db.query(
        `UPDATE \`${cfg.table}\` SET ${sets} WHERE \`${idCol}\` = ?`,
        values,
      );

      const [rows] = await db.query(
        `SELECT ${cfg.selectable.map((c) => `\`${c}\``).join(",")}
         FROM \`${cfg.table}\` WHERE \`${idCol}\` = ?`,
        [id],
      );

      const dataOut = Array.isArray(rows) ? (rows as any)[0] : null;
      return dataOut
        ? Response.json({ data: dataOut })
        : new Response("Not found", { status: 404 });
    } catch (e: any) {
      return new Response(e.message ?? "PATCH failed", { status: 400 });
    }
  };

  const DELETE = async (_req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const [res] = await db.query(
        `DELETE FROM \`${cfg.table}\` WHERE \`${idCol}\` = ?`,
        [id],
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
