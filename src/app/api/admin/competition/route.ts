import { createCrudHandlers } from "@lib/crud/crud";

export const competitionTable = {
  table: "competition",
  id: "id",
  selectable: [
    "id",
    "name",
    "starts_at",
    "is_active",
    "is_registration_open",
    "is_running",
    "created_at",
  ],
  editable: ["name", "starts_at", "is_active", "is_registration_open"],
  search: [
    "id",
    "name",
    "starts_at",
    "is_active",
    "is_registration_open",
    "is_running",
  ],
  defaultOrderBy: "created_at",
};

export const { GET, POST } = createCrudHandlers(competitionTable);
