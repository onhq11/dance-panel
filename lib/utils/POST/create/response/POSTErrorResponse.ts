export const POSTErrorResponse = () => {
  return Response.json({ message: "create_error" }, { status: 500 });
};
