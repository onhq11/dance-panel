import { createCrudHandlers } from "@lib/crud/crud";

export const ageGroupTable = {
  table: "age_group",
  id: "id",
  selectable: ["id", "name", "seats", "created_at"],
  editable: ["name", "seats"],
  search: ["id", "name"],
  defaultOrderBy: "created_at",
};

export const { GET, POST } = createCrudHandlers(ageGroupTable);
