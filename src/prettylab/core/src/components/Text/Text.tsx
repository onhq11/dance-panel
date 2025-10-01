import { Box, BoxProps, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
import Typography from "@mui/material/Typography";

export interface TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "caption"
    | "p"
    | "card_header";
  children?: ReactNode;
}

export default function Text({ variant = "p", children, ...props }: TextProps) {
  const card_headerSx = (theme: any) => {
    return {
      fontSize: "16px",
      fontWeight: 600,
      color: theme.palette.text.primary,
    };
  };

  const sx = (theme: any) => {
    return {
      ...(variant === "card_header" && card_headerSx(theme)),
    };
  };

  return (
    <Typography sx={sx} {...props}>
      {children}
    </Typography>
  );
}
