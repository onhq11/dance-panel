import { CrudConfig, HasMany } from "@lib/utils/_shared/types";
import { db } from "@lib/db";
import { q } from "@lib/utils/_shared/common";

export const assignHasMany = async (cfg: CrudConfig, row: any, id: number) => {
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
};
