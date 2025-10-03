import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Divider, Typography } from "@mui/material";
import Button from "@/prettylab/core/components/layout/Button/Button";
import { MdPerson } from "react-icons/md";
import Item from "@/app/(register)/_components/Content/Form/Variants/Formation/Dancers/Item";
import { Fragment, useEffect } from "react";

export default function Dancers() {
  const { control } = useFormContext();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "dancers",
  });

  useEffect(() => {
    replace([{}]);
  }, []);

  return (
    <Flex column sx={{ gap: 2 }}>
      <Typography variant="h6">Tancerze</Typography>
      <Divider flexItem orientation="horizontal" />
      {fields.map((row: any, index: number) => (
        <Fragment key={row.id}>
          {index > 0 && (
            <Divider flexItem orientation="horizontal" sx={{ my: 2 }} />
          )}
          <Item key={row.id} index={index} handleRemove={remove} />
        </Fragment>
      ))}
      {fields.length > 0 && (
        <Flex column sx={{ width: "100%" }}>
          <Divider flexItem orientation="horizontal" />
        </Flex>
      )}
      <Flex>
        <Button
          startIcon={<MdPerson />}
          onClick={() => append({})}
          sx={{ py: 1 }}
        >
          Dodaj tancerza
        </Button>
      </Flex>
    </Flex>
  );
}
