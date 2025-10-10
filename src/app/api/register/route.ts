import { db } from "@lib/db";
import { registrationType } from "@/assets/data/registrationType";

const soloData = [
  "age_group_id",
  "first_name",
  "last_name",
  "nickname",
  "year_of_birth",
  "email",
  "phone",
];
const formationData = ["coach", "formation", "dancers"];
const inputData = ["type", ...soloData, ...formationData];

const insertSolo = async (data: any) => {
  const values = [
    data.age_group_id,
    data.first_name,
    data.last_name,
    data.nickname,
    data.year_of_birth,
    data.email,
    "token",
    data.phone,
  ];

  const [res] = await db.query(
    `INSERT INTO participant (age_group_id, first_name, last_name, nickname, year_of_birth, email, token, phone) VALUES (${Array(values.length).fill("?").join(",")})`,
    values,
  );

  console.log(res);
};

const insertFormation = async (data: any) => {};

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();
    const data: Record<string, any> = {};

    for (const k of inputData)
      if (payload[k] !== undefined) data[k] = payload[k];

    if (!Object.keys(data).length)
      throw new Error("No editable fields provided.");

    if (
      data.type !== registrationType.solo &&
      data.type !== registrationType.formation
    ) {
      throw new Error("No type provided.");
    }

    switch (data.type) {
      case registrationType.solo:
        await insertSolo(data);

      case registrationType.formation:
        await insertFormation(data);
    }

    return Response.json({}, { status: 201 });
  } catch (e: any) {
    return new Response(e.message ?? "POST failed", { status: 400 });
  }
};
