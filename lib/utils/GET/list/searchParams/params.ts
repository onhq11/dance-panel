import { CrudConfig } from "@lib/utils/_shared/types";

export const buildParams = (req: Request, cfg: CrudConfig) => {
  const idCol = cfg.id ?? "id";
  const maxLimit = cfg.maxLimit ?? 100;
  const defaultOrderBy = cfg.defaultOrderBy ?? idCol;
  const defaultOrderDir = cfg.defaultOrderDir ?? "desc";
  const disableFullList = cfg.disableFullList ?? false;

  const { searchParams } = new URL(req.url);
  const search = searchParam(searchParams);
  const limit = limitParam(searchParams, maxLimit);
  const page = pageParam(searchParams);
  const offset = offsetParam(page, limit);
  const orderBy = orderByParam(searchParams, defaultOrderBy);
  const orderDir = orderDirParam(searchParams, defaultOrderDir);

  return { search, limit, page, offset, orderBy, orderDir, disableFullList };
};

const searchParam = (searchParams: any) => {
  return searchParams.get("q") ?? "";
};

const limitParam = (searchParams: any, maxLimit: number) => {
  return Math.min(Number(searchParams.get("limit") ?? 20), maxLimit);
};

const pageParam = (searchParams: any) => {
  return Math.max(Number(searchParams.get("page") ?? 1), 1);
};

const offsetParam = (page: number, limit: number) => {
  return (page - 1) * limit;
};

const orderByParam = (searchParams: any, defaultOrderBy: string) => {
  return searchParams.get("orderBy") ?? defaultOrderBy;
};

const orderDirParam = (searchParams: any, defaultOrderDir: string) => {
  return (searchParams.get("orderDir") ?? defaultOrderDir).toLowerCase() ===
    "desc"
    ? "DESC"
    : "ASC";
};
