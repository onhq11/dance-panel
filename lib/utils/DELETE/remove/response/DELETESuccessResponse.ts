import messages from "@lib/utils/_shared/messages";

export const DELETESuccessResponse = () => {
  return Response.json({ message: messages.DELETE_SUCCESS }, { status: 200 });
};
