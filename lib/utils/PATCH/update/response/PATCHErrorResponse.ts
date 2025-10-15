export const PATCHErrorResponse = () => {
  return Response.json({ message: "update_error" }, { status: 500 });
};
