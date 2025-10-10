import { CrudConfig, HasMany } from "@lib/utils/_shared/types";
import { db } from "@lib/db";
import { q } from "@lib/utils/_shared/common";

export const addHasManyRelation = async (data: any, cfg: CrudConfig) => {
  const idCol = cfg.id ?? "id";
  const hasMany = (cfg.relations ?? []).filter(
    (r) => r.type === "hasMany",
  ) as HasMany[];

  if (hasMany.length && data.length) {
    const ids = data
      .map((row: any) => row[idCol])
      .filter((value: any) => value !== null && value !== undefined);

    for (const rel of hasMany) {
      const grouped = new Map<any, any[]>();
      const [childRows] = await db.query(
        `SELECT ${rel.selectable.map((c) => q(c)).join(",")}, ${q(rel.foreignKey)} AS ${q("_fk")}
             FROM ${q(rel.table)}
             WHERE ${q(rel.foreignKey)} IN (${Array(ids.length).fill("?").join(",")})
             ${rel.orderBy ? `ORDER BY ${q(rel.orderBy)} ${rel.orderDir?.toUpperCase() === "DESC" ? "DESC" : "ASC"}` : ""}`,
        ids,
      );

      for (const cr of childRows as any[]) {
        const fk = cr._fk;
        delete cr._fk;
        if (!grouped.has(fk)) grouped.set(fk, []);
        grouped.get(fk)!.push(cr);
      }

      for (const row of data) {
        let arr = grouped.get(row[idCol]) ?? [];
        if (rel.limitPerParent && arr.length > rel.limitPerParent) {
          arr = arr.slice(0, rel.limitPerParent);
        }
        row[rel.alias] = arr;
      }
    }
  }
};
