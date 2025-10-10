import { CrudConfig, FiltersConfig, MetaData } from "@lib/utils/_shared/types";
import { q } from "@lib/utils/_shared/common";
import {
  buildBelongsToJoins,
  processBelongsToRelation,
} from "@lib/utils/GET/list/relation/belongsTo";
import { db } from "@lib/db";
import { buildParams } from "@lib/utils/GET/list/searchParams/params";
import { addHasManyRelation } from "@lib/utils/GET/list/relation/hasMany";

interface BuildQuery {
  data: any;
  meta: MetaData;
}

const defaultFiltersConfig: FiltersConfig = {
  search: true,
  limit: true,
  page: true,
  relations: true,
  order: true,
};

export const buildQuery = async (
  req: Request,
  cfg: CrudConfig,
  filtersConfig: FiltersConfig = defaultFiltersConfig,
): Promise<BuildQuery> => {
  const { search, limit, page, offset, orderBy, orderDir, disableFullList } =
    buildParams(req, cfg);

  const selectTable = `FROM ${q(cfg.table)}`;
  let selectColumns = "";
  let selectJoins = "";
  let selectWhere = "";
  let selectOrder = "";
  let selectLimit = "";
  let selectPage = "";

  let selectWhereValues: Array<any> = [];

  addBelongsToRelation(
    ({ sql, joins }) => {
      selectColumns = sql;

      if (filtersConfig.relations) {
        selectJoins = joins.join(" ");
      }
    },
    cfg,
    filtersConfig,
  );

  addSearch(
    ({ sql, whereValues }) => {
      selectWhere = sql;
      selectWhereValues = whereValues;
    },
    search,
    cfg,
    filtersConfig,
  );

  addOrder(
    ({ sql }) => {
      selectOrder = sql;
    },
    orderBy,
    orderDir,
    cfg,
    filtersConfig,
  );

  addLimit(
    ({ sql }) => {
      selectLimit = sql;
    },
    limit,
    disableFullList,
    filtersConfig,
  );

  addPage(
    ({ sql }) => {
      selectPage = sql;
    },
    offset,
    filtersConfig,
  );

  const query = [
    selectColumns,
    selectTable,
    selectJoins,
    selectWhere,
    selectOrder,
    selectLimit,
    selectPage,
  ];
  const countQuery = [selectTable, selectWhere];

  const [rows] = await db.query(query.join(" "), selectWhereValues);
  const data = getData(rows);

  const [countRows] = await db.query(
    `SELECT COUNT(*) AS total ${countQuery.join(" ")}`,
    selectWhereValues,
  );
  const count = getCount(countRows);

  if (filtersConfig.relations) {
    processBelongsToRelation(data, cfg);
    await addHasManyRelation(data, cfg);
  }

  return {
    data,
    meta: { page, limit, count },
  };
};

export const addBelongsToRelation = (
  callback: (props: any) => void,
  cfg: CrudConfig,
  filtersConfig: FiltersConfig,
) => {
  const formatSelectable = (cfg: CrudConfig) => {
    return cfg.selectable.map((c) => `${q(cfg.table)}.${q(c)}`);
  };

  if (filtersConfig.relations) {
    const { joins, selectPieces } = buildBelongsToJoins(cfg);
    callback({
      sql: `SELECT ${[...formatSelectable(cfg), ...selectPieces].join(",")}`,
      joins,
    });
    return;
  }

  callback({ sql: `SELECT ${formatSelectable(cfg).join(",")}` });
};

export const addSearch = (
  callback: (props: any) => void,
  search: string,
  cfg: CrudConfig,
  filtersConfig: FiltersConfig,
) => {
  const whereParts: string[] = [];
  const whereValues: any[] = [];

  if (filtersConfig.search && search && cfg.search?.length) {
    const like = `%${search}%`;

    whereParts.push(
      "(" +
        cfg.search.map((c) => `${q(cfg.table)}.${q(c)} LIKE ?`).join(" OR ") +
        ")",
    );
    whereValues.push(...cfg.search.map(() => like));
  }

  callback({
    sql: whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "",
    whereValues,
  });
};

export const addOrder = (
  callback: (props: any) => void,
  orderBy: string,
  orderDir: string,
  cfg: CrudConfig,
  filtersConfig: FiltersConfig,
) => {
  if (filtersConfig.order) {
    callback({ sql: `ORDER BY ${q(cfg.table)}.${q(orderBy)} ${orderDir}` });
    return;
  }

  callback({ sql: "" });
};

export const addLimit = (
  callback: (props: any) => void,
  limit: number,
  disableFullList: boolean,
  filtersConfig: FiltersConfig,
) => {
  if (filtersConfig.limit && (disableFullList ? true : limit !== 0)) {
    callback({ sql: `LIMIT ${limit}` });
    return;
  }

  callback({ sql: "" });
};

export const addPage = (
  callback: (props: any) => void,
  offset: number,
  filtersConfig: FiltersConfig,
) => {
  if (filtersConfig.page) {
    callback({ sql: `OFFSET ${offset}` });
    return;
  }

  callback({ sql: "" });
};

const getCount = (countRows: any) => {
  return Array.isArray(countRows) ? (countRows?.[0]?.total ?? 0) : 0;
};

const getData = (rows: any) => {
  return Array.isArray(rows) ? rows : [];
};
