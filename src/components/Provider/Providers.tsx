"use client";

import { ReactNode } from "react";
import ThemeProvider from "@/components/Provider/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NotifyProvider from "@/components/Provider/NotifyProvider/NotifyProvider";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NotifyProvider>{children}</NotifyProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
