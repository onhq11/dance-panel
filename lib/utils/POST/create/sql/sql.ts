import { CrudConfig } from "@lib/utils/_shared/types";
import { db } from "@lib/db";
import { assignEditableValues, q } from "@lib/utils/_shared/common";

export const buildPOSTQuery = async (req: Request, cfg: CrudConfig) => {
  const payload = await req.json();
  const data: Record<string, any> = {};

  assignEditableValues(cfg.editable, payload, data);

  const cols = Object.keys(data);
  const vals = Object.values(data);

  const [res]: any = await db.query(
    `INSERT INTO ${q(cfg.table)} (${cols.map(q).join(",")}) VALUES (${Array(cols.length).fill("?").join(",")})`,
    vals,
  );

  return res;
};
