"use client";

import {
  Switch,
  FormControlLabel,
  FormHelperText,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@prettylab/core/utils/form/validation";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

interface SwitchProps {
  name: string;
  label?: string;
  rules?: any;
  onChange?: (checked: boolean) => void;
  required?: boolean;
}

export default function InputSwitch({
  name,
  label,
  rules = {},
  onChange,
  required = false,
  ...props
}: SwitchProps & Partial<MuiSwitchProps>) {
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
        <Flex column>
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={!!field.value}
                onChange={(e, checked) => {
                  field.onChange(checked);
                  if (onChange) {
                    onChange(checked);
                  }
                }}
                {...props}
              />
            }
            label={label}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Flex>
      )}
    />
  );
}
