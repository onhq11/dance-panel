import {
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import Flex from "@/prettylab/core/components/layout/Flex/Flex";

type Props = {
  name: string;
  options: Array<any>;
  label?: string;
  rules?: any;
  required?: boolean;
};

export default function InputRadioGroup({
  name,
  options,
  label,
  rules,
  required = false,
  ...props
}: Props & Partial<RadioGroupProps>) {
  const theme = useTheme();
  const { control } = useFormContext();

  const combinedRules = {
    ...rules,
    ...(required && { required: true }),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={combinedRules}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Flex column>
          <Typography
            sx={{
              color: !!error ? theme.palette.error.main : "#053129",
              fontWeight: "bold",
            }}
          >
            {label}
          </Typography>
          <RadioGroup
            row
            sx={{ display: "flex", gap: 1 }}
            {...field}
            {...props}
          >
            {options.map((item, itemIndex) => (
              <FormControlLabel
                key={itemIndex}
                sx={{ mx: 0.25, my: 1 }}
                value={item.value}
                label=""
                control={
                  <Radio
                    sx={{ p: 0, opacity: item.available_slots <= 0 ? 0.5 : 1 }}
                    disabled={item.available_slots <= 0}
                    icon={
                      <Paper
                        sx={{
                          py: 1,
                          px: 1.5,
                          bgcolor: "#fff",
                        }}
                      >
                        <Typography
                          sx={{
                            color: !!error ? theme.palette.error.main : "",
                            textAlign: "center",
                            fontSize: 16,
                          }}
                        >
                          {item.label}
                          <br />
                          <span style={{ fontSize: 11 }}>
                            Wolne miejsca: {item.available_slots}
                          </span>
                        </Typography>
                      </Paper>
                    }
                    checkedIcon={
                      <Paper
                        sx={{
                          py: 1,
                          px: 1.5,
                          bgcolor: "#003129",
                        }}
                      >
                        <Typography
                          sx={{
                            color: !!error ? theme.palette.error.main : "white",
                            textAlign: "center",
                            fontSize: 16,
                          }}
                        >
                          {item.label}
                          <br />
                          <span style={{ fontSize: 11 }}>
                            Wolne miejsca: {item.available_slots}
                          </span>
                        </Typography>
                      </Paper>
                    }
                  />
                }
              />
            ))}
          </RadioGroup>
          {!!error && (
            <Typography
              sx={{ color: theme.palette.error.main, ml: 1.5, fontSize: 12 }}
            >
              {error?.message}
            </Typography>
          )}
        </Flex>
      )}
    />
  );
}
