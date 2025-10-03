"use client";

import { TextField, TextFieldProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";

interface Props {
  name: string;
  rules?: any;
  onChange?: (e: any) => void;
  required?: boolean;
}

export default function InputText({
  name,
  rules = {},
  onChange,
  required = false,
  ...props
}: Props & Partial<TextFieldProps>) {
  const { control } = useFormContext();

  const combinedRules = {
    ...rules,
    ...(required && validationRequired),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={combinedRules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          value={field.value || ""}
          helperText={error ? error.message : ""}
          onChange={(e) => {
            field.onChange(e);

            if (onChange) {
              onChange(e);
            }
          }}
          {...(required && { required: true })}
          {...props}
        />
      )}
    />
  );
}
