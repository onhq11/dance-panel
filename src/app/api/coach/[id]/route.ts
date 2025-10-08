import { createCrudHandlersById } from "@lib/crud/crud";
import { coachTable } from "@/app/api/coach/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(coachTable);
