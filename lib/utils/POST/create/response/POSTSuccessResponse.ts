import messages from "@lib/utils/_shared/messages";

export const POSTSuccessResponse = (id: number) => {
  return Response.json(
    { id, message: messages.CREATE_SUCCESS },
    { status: 201 },
  );
};
