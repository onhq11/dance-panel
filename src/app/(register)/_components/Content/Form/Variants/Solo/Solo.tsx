import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import InputRadioGroup from "@/components/Form/InputRadioGroup";
import { ageGroups } from "@/assets/data/ageGroup";
import Field from "@/app/(register)/_components/Content/Form/Field";
import InputText from "@/components/Form/InputText";
import {
  validationEmail,
  validationPhoneNumber,
} from "@/prettylab/core/utils/form/validation";
import InputYear from "@/components/Form/InputYear";

export default function Solo() {
  return (
    <Flex column sx={{ gap: 3 }}>
      <InputRadioGroup
        name={"age_group_id"}
        label="Kategoria wiekowa"
        options={ageGroups.map((row: any) => ({
          label: row.name,
          value: row.id,
          available_slots: row.available_slots,
        }))}
        required
      />
      <Flex wrap sx={{ gap: 3 }}>
        <Field name="first_name" label={"Imię"} sx={{ flex: 1, minWidth: 150 }}>
          <InputText name={"first_name"} autoComplete="given-name" required />
        </Field>
        <Field
          name="last_name"
          label={"Nazwisko"}
          sx={{ flex: 1, minWidth: 150 }}
        >
          <InputText name={"last_name"} autoComplete="family-name" required />
        </Field>
      </Flex>
      <Field name="nickname" label={"Ksywa / Pseudonim"}>
        <InputText name={"nickname"} autoComplete="nickname" required />
      </Field>
      <Field name="year_of_birth" label={"Rok urodzenia"}>
        <InputYear
          name={"year_of_birth"}
          autoComplete="bday-year"
          required
          disableFuture
        />
      </Field>
      <Field name="email" label={"E-Mail"}>
        <InputText
          name={"email"}
          autoComplete="email"
          required
          rules={validationEmail}
        />
      </Field>
      <Field name="phone" label={"Numer telefonu"}>
        <InputText
          name={"phone"}
          autoComplete="tel"
          required
          rules={validationPhoneNumber}
        />
      </Field>
    </Flex>
  );
}
