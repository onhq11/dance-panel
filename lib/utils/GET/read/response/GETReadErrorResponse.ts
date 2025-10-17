import messages from "@lib/utils/_shared/messages";

export const GETReadErrorResponse = () => {
  return Response.json(
    { message: messages.INTERNAL_SERVER_ERROR },
    { status: 500 },
  );
};
