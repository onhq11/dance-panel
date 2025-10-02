"use client";

import { ReactNode } from "react";
import ThemeProvider from "@/components/Provider/ThemeProvider";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
