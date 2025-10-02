import { Controller, useFormContext } from "react-hook-form";
import { validationRequired } from "@/prettylab/core/utils/form/validation";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface InputYearProps {
  name: string;
  rules?: any;
  onChange?: (e: any) => void;
  required?: boolean;
  autoComplete?: string;
  disableFuture?: boolean;
}

export default function InputYear({
  name,
  rules = {},
  onChange,
  required = false,
  autoComplete,
  disableFuture,
}: InputYearProps) {
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
        <DatePicker
          {...field}
          value={field.value ? dayjs(field.value) : null}
          onChange={(e) => {
            field.onChange(e);

            if (onChange) {
              onChange(e);
            }
          }}
          slotProps={{
            textField: {
              helperText: error ? error.message : "",
              error: !!error,
              fullWidth: true,
              required: required,
              autoComplete: autoComplete,
            },
          }}
          views={["year"]}
          disableFuture={disableFuture}
        />
      )}
    />
  );
}
