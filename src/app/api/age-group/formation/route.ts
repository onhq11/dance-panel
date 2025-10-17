import { GETListErrorResponse } from "@lib/utils/GET/list/response/GETListErrorResponse";
import { db } from "@lib/db";
import { getData } from "@lib/utils/_shared/common";

export const GET = async () => {
  try {
    const [rows] = await db.query(
      `SELECT age_group.id, age_group.name, age_group.seats - (SELECT COUNT(*) FROM formation WHERE age_group_id = age_group.id) as available_seats FROM age_group WHERE is_solo = 1`,
    );
    const data = getData(rows);

    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return GETListErrorResponse();
  }
};
