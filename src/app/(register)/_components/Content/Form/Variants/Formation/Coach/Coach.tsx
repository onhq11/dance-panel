import Flex from "@prettylab/core/components/layout/Flex/Flex";
import { Divider, Typography } from "@mui/material";
import Field from "@/app/(register)/_components/Content/Form/Field";
import InputText from "@/components/Form/InputText";
import {
  validationEmail,
  validationPhoneNumber,
} from "@prettylab/core/utils/form/validation";

export default function Coach() {
  return (
    <Flex column sx={{ gap: 2 }}>
      <Typography variant="h6">Dane trenera</Typography>
      <Divider flexItem orientation="horizontal" />
      <Flex wrap sx={{ gap: 3 }}>
        <Field
          name="coach.first_name"
          label={"Imię"}
          sx={{ flex: 1, minWidth: 150 }}
        >
          <InputText
            name={"coach.first_name"}
            autoComplete="given-name"
            required
          />
        </Field>
        <Field
          name="coach.last_name"
          label={"Nazwisko"}
          sx={{ flex: 1, minWidth: 150 }}
        >
          <InputText
            name={"coach.last_name"}
            autoComplete="family-name"
            required
          />
        </Field>
      </Flex>
      <Field name="coach.club_name" label={"Klub"}>
        <InputText name={"coach.club_name"} required />
      </Field>
      <Field name="coach.email" label={"E-Mail"}>
        <InputText
          name={"coach.email"}
          autoComplete="email"
          required
          rules={validationEmail}
        />
      </Field>
      <Field name="coach.phone" label={"Numer telefonu"}>
        <InputText
          name={"coach.phone"}
          autoComplete="tel"
          required
          rules={validationPhoneNumber}
        />
      </Field>
    </Flex>
  );
}
