import { createCrudHandlers } from "@lib/crud/crud";

export const participantTable = {
  table: "participant",
  id: "id",
  selectable: [
    "id",
    "age_group_id",
    "formation_id",
    "first_name",
    "last_name",
    "nickname",
    "year_of_birth",
    "email",
    "phone",
    "created_at",
  ],
  editable: [
    "age_group_id",
    "formation_id",
    "first_name",
    "last_name",
    "nickname",
    "year_of_birth",
    "email",
    "phone",
  ],
  search: [
    "id",
    "age_group_id",
    "formation_id",
    "first_name",
    "last_name",
    "nickname",
    "year_of_birth",
    "email",
    "phone",
  ],
  defaultOrderBy: "created_at",
};

export const { GET, POST } = createCrudHandlers(participantTable);
