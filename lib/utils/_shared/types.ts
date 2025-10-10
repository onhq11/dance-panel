// CONFIG
export type IdPromise = { params: Promise<{ id: string }> };

export type CrudConfig = {
  table: string;
  id?: string;
  selectable: readonly string[];
  editable: readonly string[];
  search?: readonly string[];
  defaultOrderBy?: string;
  defaultOrderDir?: "asc" | "desc";
  maxLimit?: number;
  relations?: readonly Relation[];
  disableFullList?: boolean;
};

// RELATIONS
export interface BelongsTo {
  type: "belongsTo";
  table: string;
  alias: string;
  localKey: string;
  foreignKey: string;
  selectable: readonly string[];
}

export interface HasMany {
  type: "hasMany";
  table: string;
  alias: string;
  foreignKey: string;
  selectable: readonly string[];
  orderBy?: string;
  orderDir?: "asc" | "desc";
  limitPerParent?: number;
}

export type Relation = BelongsTo | HasMany;

// FILTERS
export interface FiltersConfig {
  search: boolean;
  limit: boolean;
  page: boolean;
  relations: boolean;
  order: boolean;
}

export interface MetaData {
  page: number;
  limit: number;
  count: number;
}
