import { createCrudHandlers } from "@lib/crud/crud";

export const userTable = {
  table: "user",
  id: "id",
  selectable: ["id", "first_name", "last_name", "email", "created_at"],
  editable: ["first_name", "last_name", "email"],
  search: ["id", "first_name", "last_name", "email"],
  defaultOrderBy: "created_at",
};

export const { GET, POST } = createCrudHandlers(userTable);
