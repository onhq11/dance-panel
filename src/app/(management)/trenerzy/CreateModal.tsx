"use client";

import Flex from "@prettylab/core/components/layout/Flex/Flex";
import { Dialog, DialogContent } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@prettylab/core/components/layout/Button/Button";
import { PiUserCirclePlus } from "react-icons/pi";
import { useState } from "react";
import InputText from "@/components/Form/InputText";
import { create } from "@prettylab/core/utils/api/crud";
import { useSnackbar } from "notistack";

type Props = {
  reloadTable: () => void;
};

export default function CreateModal({ reloadTable }: Props) {
  const form = useForm();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { reset, handleSubmit } = form;

  const onSubmit = async (data: any) => {
    await create("http://localhost:4000/api/coach", data);
    enqueueSnackbar("Pomyślnie utworzono", { variant: "info" });
    setOpen(false);
    reset();
    reloadTable();
  };

  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 3 }}>
          <FormProvider {...form}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Flex column sx={{ gap: 2 }}>
                <InputText label="Imię" name="first_name" />
                <InputText label="Nazwisko" name="last_name" />
                <InputText label="Nazwa klubu" name="club_name" />
                <InputText label="E-Mail" name="email" />
                <InputText label="Numer telefonu" name="phone" />
              </Flex>
              <Flex end sx={{ mt: 1, gap: 1 }}>
                <Button
                  sx={{ py: 1 }}
                  onClick={() => {
                    reset();
                    setOpen(false);
                  }}
                >
                  Anuluj
                </Button>
                <Button
                  sx={{ py: 1 }}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  Zapisz
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <Flex end>
        <Button
          color="success"
          variant="contained"
          startIcon={<PiUserCirclePlus />}
          sx={{ py: 1 }}
          onClick={() => setOpen(true)}
        >
          Utwórz
        </Button>
      </Flex>
    </>
  );
}
