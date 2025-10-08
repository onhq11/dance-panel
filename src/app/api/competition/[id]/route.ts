import { createCrudHandlersById } from "@lib/crud/crud";
import { competitionTable } from "@/app/api/competition/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(competitionTable);
