import { db } from "@lib/db";
import { q } from "@lib/utils/_shared/common";
import { CrudConfig } from "@lib/utils/_shared/types";

export const buildDELETEQuery = async (id: number, cfg: CrudConfig) => {
  const idCol = cfg.id ?? "id";

  const [res] = await db.query(
    `DELETE FROM ${q(cfg.table)} WHERE ${q(idCol)} = ?`,
    [id],
  );

  const affected = (res as any).affectedRows ?? 0;
  return !!affected;
};
