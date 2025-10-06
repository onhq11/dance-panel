"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SetState } from "@prettylab/core/types/SetState";
import { useBreakpointDown } from "@prettylab/core/utils/mui/breakpoints";
import { useSettings } from "@prettylab/core/hooks/useSettings";
import config from "@prettylab/config";

interface Props {
  settings: any;
  children: ReactNode;
}

interface ContextProps {
  title?: string;
  setTitle?: SetState;
  isDrawer?: boolean;
  open?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  collapsed?: boolean;
  handleToggleCollapsed?: () => void;
}

export const MenuContext = createContext<ContextProps>({});
export default function MenuProvider({
  settings = config.core.settings.defaults,
  children,
}: Props) {
  const pathname = usePathname();
  const isMobile = useBreakpointDown("lg");
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useSettings(
    "menu-collapsed",
    settings["menu-collapsed"],
  );
  const [isDrawer, setIsDrawer] = useSettings(
    "menu-isDrawer",
    settings["menu-isDrawer"],
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    setIsDrawer(isMobile);
  }, [isMobile]);

  useEffect(() => {
    setTitle("");
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleCollapsed = () => {
    setCollapsed((prev: boolean) => !prev);
  };

  return (
    <MenuContext.Provider
      value={{
        title,
        setTitle,
        isDrawer,
        open,
        handleClose,
        handleOpen,
        collapsed,
        handleToggleCollapsed,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
