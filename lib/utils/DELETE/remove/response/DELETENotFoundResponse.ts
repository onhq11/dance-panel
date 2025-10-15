export const DELETENotFoundResponse = () => {
  return Response.json({ message: "not_found" }, { status: 404 });
};
