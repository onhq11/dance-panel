export const GETErrorResponse = () => {
  return Response.json({ message: "internal_server_error" }, { status: 500 });
};
