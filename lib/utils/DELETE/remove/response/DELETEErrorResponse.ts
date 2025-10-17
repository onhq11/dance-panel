import messages from "@lib/utils/_shared/messages";

export const DELETEErrorResponse = () => {
  return Response.json({ message: messages.DELETE_ERROR }, { status: 500 });
};
