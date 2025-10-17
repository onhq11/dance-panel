import messages from "@lib/utils/_shared/messages";

export const POSTErrorResponse = () => {
  return Response.json({ message: messages.CREATE_ERROR }, { status: 500 });
};
