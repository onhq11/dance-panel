import messages from "@lib/utils/_shared/messages";

export const PATCHErrorResponse = () => {
  return Response.json({ message: messages.UPDATE_ERROR }, { status: 500 });
};
