import { db } from "../db";
import { CrudConfig, HasMany, IdPromise } from "@lib/utils/_shared/types";
import { buildBelongsToJoins } from "@lib/utils/GET/list/relation/belongsTo";
import { q } from "@lib/utils/_shared/common";
import { buildQuery } from "@lib/utils/GET/list/sql/sql";
import { GETSuccessResponse } from "@lib/utils/GET/list/response/GETSuccessResponse";
import { GETErrorResponse } from "@lib/utils/GET/list/response/GETErrorResponse";
import { POSTSuccessResponse } from "@lib/utils/POST/create/response/POSTSuccessResponse";
import { POSTErrorResponse } from "@lib/utils/POST/create/response/POSTErrorResponse";

export function createCrudHandlers(cfg: CrudConfig) {
  const GET = async (req: Request) => {
    try {
      const { data, meta } = await buildQuery(req, cfg);
      return GETSuccessResponse(data, meta);
    } catch (error: any) {
      console.error(error.message);
      return GETErrorResponse();
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

      const [res]: any = await db.query(
        `INSERT INTO ${q(cfg.table)} (${cols.map(q).join(",")}) VALUES (${Array(cols.length).fill("?").join(",")})`,
        vals,
      );

      return POSTSuccessResponse(res.insertId);
    } catch (error: any) {
      console.error(error);
      return POSTErrorResponse();
    }
  };

  return { GET, POST };
}

export function createCrudHandlersById(cfg: CrudConfig) {
  const idCol = cfg.id ?? "id";

  const GET = async (_req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
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
        [id],
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
          [id],
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

  const PATCH = async (_req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const payload = await _req.json();
      const data: Record<string, any> = {};
      for (const k of cfg.editable)
        if (payload[k] !== undefined) data[k] = payload[k];
      if (!Object.keys(data).length)
        throw new Error("No editable fields provided.");

      const sets = Object.keys(data)
        .map((c) => `${q(c)} = ?`)
        .join(", ");
      const values = [...Object.values(data), id];

      await db.query(
        `UPDATE ${q(cfg.table)} SET ${sets} WHERE ${q(idCol)} = ?`,
        values,
      );
      return GET(_req, { params }); // return fresh with relations
    } catch (e: any) {
      return new Response(e.message ?? "PATCH failed", { status: 400 });
    }
  };

  const DELETE = async (_req: Request, { params }: IdPromise) => {
    const { id } = await params;

    try {
      const [res] = await db.query(
        `DELETE FROM ${q(cfg.table)} WHERE ${q(idCol)} = ?`,
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
