import { createCrudHandlersById } from "@lib/crud/crud";
import { participantTable } from "@/app/api/admin/participant/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(participantTable);
