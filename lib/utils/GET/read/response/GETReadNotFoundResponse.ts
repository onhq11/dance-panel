export const GETReadNotFoundResponse = () => {
  return Response.json({ message: "not_found" }, { status: 404 });
};
