export const DELETEErrorResponse = () => {
  return Response.json({ message: "delete_error" }, { status: 500 });
};
