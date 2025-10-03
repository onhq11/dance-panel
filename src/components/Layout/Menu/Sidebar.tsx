"use client";

import { ReactNode } from "react";
import { alpha, Box } from "@mui/material";
import DrawerExpandButton from "./DrawerExpandButton";
import {
  useMenuCollapsed,
  useMenuHandleToggleCollapsed,
} from "@/hooks/useMenu";

interface Props {
  children: ReactNode;
}

export default function Sidebar({ children }: Props) {
  const collapsed = useMenuCollapsed();
  const handleToggleCollapsed = useMenuHandleToggleCollapsed();

  return (
    <Box
      sx={{
        height: "100vh",
        width: collapsed ? 90 : 270,
        minWidth: collapsed ? 90 : 270,
        backgroundColor: "#000",
        borderRight: `1px solid ${alpha("#fff", 0.1)}`,
        position: "relative",
        transition: "0.2s",
      }}
    >
      {children}
      <DrawerExpandButton onClick={handleToggleCollapsed} />
    </Box>
  );
}
