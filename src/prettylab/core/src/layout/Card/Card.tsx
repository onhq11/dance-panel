import React, { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import Flex from "../../components/Flex/Flex";
import Img from "../../components/Img/Img";
import { Box, lighten } from "@mui/material";
import getThemeColor from "../../utils/getThemeColor";

export interface CardProps {
  header?: string;
  variant?: "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "warning" | "info" | "error";
  children?: ReactNode;
}

export default function Card({
  header,
  variant = "outlined",
  color = "primary",
  children,
}: CardProps) {
  const outlinedSx = (theme: any) => {
    return {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: getThemeColor(theme, color),
      borderRadius: "12px",
      backgroundColor: "black",

      "&:hover": {
        borderColor: lighten(getThemeColor(theme, color), 0.2),
        color: "white",
      },
    };
  };

  const sx = (theme: any) => {
    return {
      p: 3,
      ...(variant === "outlined" && outlinedSx(theme)),
    };
  };

  return <Flex sx={sx}></Flex>;
}
