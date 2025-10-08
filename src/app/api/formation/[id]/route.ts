import { createCrudHandlersById } from "@lib/crud/crud";
import { formationTable } from "@/app/api/formation/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(formationTable);
