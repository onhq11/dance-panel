export const POSTSuccessResponse = (id: number) => {
  return Response.json({ id, message: "create_success" }, { status: 201 });
};
