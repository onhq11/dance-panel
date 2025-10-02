"use client";

import { ReactNode, useContext } from "react";
import { alpha, Box, useTheme, Button } from "@mui/material";
import IconButton from "../../../../../manager/src/components/Layout/IconButton";
import DrawerExpandButton from "./DrawerExpandButton";
import {
  useMenuCollapsed,
  useMenuHandleClose,
  useMenuHandleOpen,
  useMenuHandleToggleCollapsed,
  useMenuIsDrawer,
} from "../../../../../manager/src/hooks/useMenu";

interface Props {
  children: ReactNode;
}

export default function Sidebar({ children }: Props) {
  const theme = useTheme();
  const collapsed = useMenuCollapsed();
  const handleToggleCollapsed = useMenuHandleToggleCollapsed();

  return (
    <Box
      sx={{
        height: "100vh",
        width: collapsed ? 90 : 270,
        minWidth: collapsed ? 90 : 270,
        backgroundColor: theme.palette.background.default,
        borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        position: "relative",
        transition: "0.2s",
      }}
    >
      {children}
      <DrawerExpandButton onClick={handleToggleCollapsed} />
    </Box>
  );
}
