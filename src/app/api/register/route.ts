import { db } from "@lib/db";
import { registrationType } from "@/enums/registrationType";
import { assignEditableValues, q } from "@lib/utils/_shared/common";
import messages from "@lib/utils/_shared/messages";

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

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();
    const data: Record<string, any> = {};

    assignEditableValues(inputData, payload, data);

    if (!Object.values(registrationType).includes(data.type)) {
      return Response.json(
        { message: messages.NO_VALID_TYPE },
        { status: 400 },
      );
    }

    let result = false;

    switch (data.type) {
      case registrationType.solo:
        result = !!(await insertSolo(data));
        break;

      case registrationType.formation:
        result = !!(await insertFormation());
        break;
    }

    if (result) {
      return Response.json(
        { message: messages.CREATE_SUCCESS },
        { status: 201 },
      );
    }

    return Response.json({ message: messages.CREATE_ERROR }, { status: 400 });
  } catch (error: any) {
    console.error(error.message);
    return Response.json(
      { message: messages.INTERNAL_SERVER_ERROR },
      { status: 500 },
    );
  }
};

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

  const [res]: any = await db.query(
    `INSERT INTO participant (${q("age_group_id")}, ${q("first_name")}, ${q("last_name")}, ${q("nickname")}, ${q("year_of_birth")}, ${q("email")}, ${q("token")}, ${q("phone")}) VALUES (${Array(values.length).fill("?").join(",")})`,
    values,
  );

  return res.affectedRows;
};

const insertFormation = async () => {
  return true;
};
