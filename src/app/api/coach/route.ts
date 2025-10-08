import { createCrudHandlers } from "@lib/crud/crud";

export const coachTable = {
  table: "coach",
  id: "id",
  selectable: [
    "id",
    "first_name",
    "last_name",
    "club_name",
    "email",
    "phone",
    "created_at",
  ],
  editable: ["first_name", "last_name", "club_name", "email", "phone"],
  search: ["id", "first_name", "last_name", "club_name", "email", "phone"],
  defaultOrderBy: "created_at",
};

export const { GET, POST } = createCrudHandlers(coachTable);
