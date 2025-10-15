export const GETReadSuccessResponse = (data: any) => {
  return Response.json({ data, message: "success" }, { status: 200 });
};
