import { CrudConfig } from "@lib/utils/_shared/types";

export const assignBelongsTo = (cfg: CrudConfig, row: any) => {
  for (const relation of cfg.relations ?? []) {
    if (relation.type !== "belongsTo") continue;

    const nested: any = {};
    for (const col of relation.selectable) {
      const key = `${relation.alias}__${col}`;
      nested[col] = row[key];
      delete row[key];
    }

    row[relation.alias] = nested;
  }
};
