import { createCrudHandlersById } from "@lib/crud/crud";
import { participantTable } from "@/app/api/participant/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(participantTable);
