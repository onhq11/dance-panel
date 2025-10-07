import { createCrudHandlersById } from "@lib/crud/crud";
import { ageGroupTable } from "@/app/api/age-group/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(ageGroupTable);
