import { createCrudHandlersById } from "@lib/crud/crud";
import { userTable } from "@/app/api/user/route";

export const { GET, PATCH, DELETE } = createCrudHandlersById(userTable);
