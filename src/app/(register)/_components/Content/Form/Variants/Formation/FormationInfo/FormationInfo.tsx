import Flex from "@prettylab/core/components/layout/Flex/Flex";
import InputRadioGroup from "@/components/Form/InputRadioGroup";
import InputText from "@/components/Form/InputText";
import Field from "@/app/(register)/_components/Content/Form/Field";
import { Divider, Typography } from "@mui/material";

interface Props {
  formationGroups: Array<any>;
}

export default function FormationInfo({ formationGroups }: Props) {
  return (
    <Flex column sx={{ gap: 2 }}>
      <Typography variant="h6">Formacja</Typography>
      <Divider flexItem orientation="horizontal" />
      <InputRadioGroup
        name={"formation.age_group_id"}
        label="Kategoria wiekowa"
        options={formationGroups.map((row: any) => ({
          label: row.name,
          value: row.id,
          available_seats: row.available_seats || 0,
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
