export const GETReadErrorResponse = () => {
  return Response.json({ message: "read_error" }, { status: 500 });
};
