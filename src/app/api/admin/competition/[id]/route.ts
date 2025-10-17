import { createCrudHandlersById } from "@lib/crud/crud";
import { competitionTable } from "@/app/api/admin/competition/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(competitionTable);
