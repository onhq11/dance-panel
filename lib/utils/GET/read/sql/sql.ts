import { buildBelongsToJoins } from "@lib/utils/GET/list/relation/belongsTo";
import { q } from "@lib/utils/_shared/common";
import { CrudConfig } from "@lib/utils/_shared/types";
import { db } from "@lib/db";
import { GETReadNotFoundResponse } from "@lib/utils/GET/read/response/GETReadNotFoundResponse";
import { assignBelongsTo } from "@lib/utils/GET/read/relation/belongsTo";
import { assignHasMany } from "@lib/utils/GET/read/relation/hasMany";

export const buildGETReadQuery = async (id: number, cfg: CrudConfig) => {
  const idCol = cfg.id ?? "id";

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
  if (!row) {
    return GETReadNotFoundResponse();
  }

  assignBelongsTo(cfg, row);
  await assignHasMany(cfg, row, id);

  return row;
};
