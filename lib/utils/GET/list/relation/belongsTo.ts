import { CrudConfig } from "@lib/utils/_shared/types";
import { q } from "@lib/utils/_shared/common";

export const buildBelongsToJoins = (cfg: CrudConfig) => {
  const joins: string[] = [];
  const selectPieces: string[] = [];

  for (const r of cfg.relations ?? []) {
    if (r.type !== "belongsTo") continue;

    joins.push(
      `LEFT JOIN ${q(r.table)} AS ${q(r.alias)} ON ${q(cfg.table)}.${q(r.localKey)} = ${q(r.alias)}.${q(r.foreignKey)}`,
    );

    for (const col of r.selectable) {
      selectPieces.push(
        `${q(r.alias)}.${q(col)} AS ${q(`${r.alias}__${col}`)}`,
      );
    }
  }

  return { joins, selectPieces };
};

export const processBelongsToRelation = (data: Array<any>, cfg: CrudConfig) => {
  for (const relation of cfg.relations ?? []) {
    if (relation.type !== "belongsTo") continue;

    for (const row of data) {
      const nested: any = {};
      for (const col of relation.selectable) {
        const key = `${relation.alias}__${col}`;
        nested[col] = row[key];
        delete row[key];
      }

      row[relation.alias] = nested;
    }
  }
};
