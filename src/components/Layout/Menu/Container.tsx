"use client";

import { ReactNode, useContext } from "react";
import { Box, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import { useMenuContext } from "../../../../../manager/src/hooks/useMenu";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  const { isDrawer, open, handleClose } = useMenuContext();

  const menuBody = <Sidebar>{children}</Sidebar>;

  return isDrawer ? (
    <Drawer open={open} onClose={handleClose}>
      {menuBody}
    </Drawer>
  ) : (
    menuBody
  );
}
