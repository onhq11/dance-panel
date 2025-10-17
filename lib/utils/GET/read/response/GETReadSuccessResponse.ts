import messages from "@lib/utils/_shared/messages";

export const GETReadSuccessResponse = (data: any) => {
  return Response.json({ data, message: messages.OK }, { status: 200 });
};
