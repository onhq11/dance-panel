export const PATCHNotFoundResponse = () => {
  return Response.json({ message: "not_found" }, { status: 404 });
};
