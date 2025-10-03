import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import InputText from "@/components/Form/InputText";
import Field from "@/app/(register)/_components/Content/Form/Field";
import InputYear from "@/components/Form/InputYear";
import { PiTrash } from "react-icons/pi";
import InputSwitch from "@/components/Form/InputSwitch";
import { useFormContext } from "react-hook-form";
import { ageGroups } from "@/assets/data/ageGroup";
import InputRadioGroup from "@/components/Form/InputRadioGroup";
import Button from "@/prettylab/core/components/layout/Button/Button";
import Icon from "@/prettylab/core/components/layout/Icon/Icon";
import { MdPerson } from "react-icons/md";
import { Typography } from "@mui/material";

interface Props {
  index: number;
  handleRemove: (index: number) => void;
}

export default function Item({ index, handleRemove }: Props) {
  const { watch } = useFormContext();
  const isSolo = watch(`dancers[${index}].is_solo`);

  return (
    <Flex column sx={{ gap: 2 }}>
      <Flex between>
        <Flex
          sx={{ gap: 1, backgroundColor: "#eee", p: 1, borderRadius: "9px" }}
          alignCenter
        >
          <Icon>
            <MdPerson />
          </Icon>
          <Typography>Tancerz {index + 1}</Typography>
        </Flex>
        <Flex>
          <Button
            sx={{ py: 1 }}
            color="error"
            startIcon={<PiTrash />}
            onClick={() => handleRemove(index)}
            variant={"outlined"}
          >
            Usuń tancerza
          </Button>
        </Flex>
      </Flex>
      <Field
        name={`dancers[${index}].first_name`}
        label={"Imię"}
        sx={{ flex: 1, minWidth: 150 }}
      >
        <InputText
          name={`dancers[${index}].first_name`}
          autoComplete="given-name"
          required
        />
      </Field>
      <Field
        name={`dancers[${index}].last_name`}
        label={"Nazwisko"}
        sx={{ flex: 1, minWidth: 150 }}
      >
        <InputText
          name={`dancers[${index}].last_name`}
          autoComplete="family-name"
          required
        />
      </Field>
      <Field name={`dancers[${index}].year_of_birth`} label={"Rok urodzenia"}>
        <InputYear
          name={`dancers[${index}].year_of_birth`}
          required
          disableFuture
        />
      </Field>
      {isSolo && (
        <>
          <Field
            name={`dancers[${index}].nickname`}
            label={"Ksywa / Pseudonim"}
          >
            <InputText name={`dancers[${index}].nickname`} required />
          </Field>
          <InputRadioGroup
            name={`dancers[${index}].age_group_id`}
            label="Kategoria wiekowa"
            options={ageGroups.map((row: any) => ({
              label: row.name,
              value: row.id,
              available_slots: row.available_slots,
            }))}
            required
          />
        </>
      )}
      <Flex between alignCenter>
        <InputSwitch
          name={`dancers[${index}].is_solo`}
          label="Dodaj również jako solista"
        />
      </Flex>
    </Flex>
  );
}
