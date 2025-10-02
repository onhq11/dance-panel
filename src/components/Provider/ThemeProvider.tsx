"use client";

import { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "@/config/theme";

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
