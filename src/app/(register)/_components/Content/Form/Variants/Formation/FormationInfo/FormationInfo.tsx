import Flex from "@prettylab/core/components/layout/Flex/Flex";
import { ageGroups } from "@/assets/data/ageGroup";
import InputRadioGroup from "@/components/Form/InputRadioGroup";
import InputText from "@/components/Form/InputText";
import Field from "@/app/(register)/_components/Content/Form/Field";
import { Divider, Typography } from "@mui/material";

export default function FormationInfo() {
  return (
    <Flex column sx={{ gap: 2 }}>
      <Typography variant="h6">Formacja</Typography>
      <Divider flexItem orientation="horizontal" />
      <InputRadioGroup
        name={"formation.age_group_id"}
        label="Kategoria wiekowa"
        options={ageGroups.map((row: any) => ({
          label: row.name,
          value: row.id,
          available_slots: row.available_slots,
        }))}
        required
      />
      <Field name="formation.name" label={"Nazwa"}>
        <InputText name={"formation.name"} required />
      </Field>
      <Field name="formation.choreographer" label={"Choreograf"}>
        <InputText name={"formation.choreographer"} required />
      </Field>
    </Flex>
  );
}
