import { createCrudHandlers } from "@lib/crud/crud";

export const formationTable = {
  table: "formation",
  id: "id",
  selectable: [
    "id",
    "age_group_id",
    "coach_id",
    "name",
    "choreographer",
    "created_at",
  ],
  editable: ["age_group_id", "coach_id", "name", "choreographer"],
  search: ["id", "age_group_id", "coach_id", "name", "choreographer"],
  defaultOrderBy: "created_at",
  relations: [
    {
      type: "belongsTo",
      table: "age_group",
      alias: "age_group",
      localKey: "age_group_id",
      foreignKey: "id",
      selectable: ["id", "name", "seats"],
    },
    {
      type: "belongsTo",
      table: "coach",
      alias: "coach",
      localKey: "coach_id",
      foreignKey: "id",
      selectable: [
        "id",
        "first_name",
        "last_name",
        "club_name",
        "email",
        "phone",
        "created_at",
      ],
    },
  ] as const,
};

export const { GET, POST } = createCrudHandlers(formationTable);
