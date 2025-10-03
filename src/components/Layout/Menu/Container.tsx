"use client";

import { ReactNode } from "react";
import { Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import { useMenuContext } from "@/hooks/useMenu";

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
