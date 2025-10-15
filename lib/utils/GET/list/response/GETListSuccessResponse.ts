import { MetaData } from "@lib/utils/_shared/types";

export const GETListSuccessResponse = (data: any, meta: MetaData) => {
  return Response.json({ data, meta }, { status: 200 });
};
