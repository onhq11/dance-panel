import { ReactNode } from "react";
import { SxProps, Typography } from "@mui/material";
import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import { useFormContext } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

type Props = {
  name: string;
  label: string;
  children: ReactNode;
  sx?: SxProps;
};

export default function Field({ name, label, children, sx }: Props) {
  const theme = useTheme();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Flex column sx={{ gap: 1, ...sx }}>
      <Typography
        sx={{
          color: !!errors?.[name] ? theme.palette.error.main : "#053129",
          fontWeight: "bold",
        }}
      >
        {label}
      </Typography>
      {children}
    </Flex>
  );
}
