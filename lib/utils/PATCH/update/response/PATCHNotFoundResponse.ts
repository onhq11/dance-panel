import messages from "@lib/utils/_shared/messages";

export const PATCHNotFoundResponse = () => {
  return Response.json({ message: messages.NOT_FOUND }, { status: 404 });
};
