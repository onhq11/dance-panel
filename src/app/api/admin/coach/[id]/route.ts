import { createCrudHandlersById } from "@lib/crud/crud";
import { coachTable } from "@/app/api/admin/coach/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(coachTable);
