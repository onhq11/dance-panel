import { assignEditableValues, q } from "@lib/utils/_shared/common";
import { db } from "@lib/db";
import { CrudConfig } from "@lib/utils/_shared/types";

export const buildPATCHQuery = async (
  req: Request,
  id: number,
  cfg: CrudConfig,
) => {
  const idCol = cfg.id ?? "id";

  const payload = await req.json();
  const data: Record<string, any> = {};

  assignEditableValues(cfg, payload, data);

  const { sets, values } = buildUpdateValues(data, id);
  const [res] = await db.query(
    `UPDATE ${q(cfg.table)}
     SET ${sets}
     WHERE ${q(idCol)} = ?`,
    values,
  );

  const affected = (res as any).affectedRows ?? 0;
  return !!affected;
};

export const buildUpdateValues = (data: any, id: number) => {
  const sets = Object.keys(data)
    .map((c) => `${q(c)} = ?`)
    .join(", ");
  const values = [...Object.values(data), id];

  return { sets, values };
};
