"use client";

import { FormProvider, useForm } from "react-hook-form";
import Flex from "@/prettylab/core/src/components/layout/Flex/Flex";
import InputSelect from "@/components/Form/InputSelect";
import {
  matchRegistrationTypeName,
  registrationType,
} from "@/assets/data/registrationType";
import Field from "@/app/(register)/_components/Content/Form/Field";
import VariantResolver from "@/app/(register)/_components/Content/Form/Variants/VariantResolver";
import { useState } from "react";
import Button from "@/prettylab/core/src/components/layout/Button/Button";
import ResultPage from "@/app/(register)/_components/Content/ResultPage/ResultPage";
import SlideIn from "@/prettylab/core/src/components/animation/SlideIn/SlideIn";

export default function Form() {
  const form = useForm();
  const [loading, setLoading] = useState(false);
  const [resultPage, setResultPage] = useState(false);

  const { handleSubmit, watch, reset } = form;
  const type = watch("type");

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log(data);

    setTimeout(() => setResultPage(true), 2000);
  };

  const handleReset = () => {
    reset();
    setLoading(false);
    setResultPage(false);
  };

  if (resultPage) {
    return <ResultPage type={type} handleReset={handleReset} />;
  }

  return (
    <SlideIn>
      <FormProvider {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Flex column sx={{ gap: 3, mt: 2 }}>
            <Field name="type" label="Kogo rejestrujesz?">
              <InputSelect
                name={"type"}
                options={Object.values(registrationType)?.map((value) => ({
                  label: matchRegistrationTypeName[value],
                  value,
                }))}
              />
            </Field>
            <VariantResolver type={type} />
            {!!type && (
              <Button
                loading={loading}
                variant="contained"
                fullWidth
                type="submit"
                sx={{ mt: 2 }}
              >
                Rejestruj!
              </Button>
            )}
          </Flex>
        </form>
      </FormProvider>
    </SlideIn>
  );
}
