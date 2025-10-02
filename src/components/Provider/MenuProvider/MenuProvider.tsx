"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useBreakpointDown } from "@/utils/breakpoint";
import { usePathname } from "next/navigation";
import { SetState } from "@/types/state";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { boolean } from "@/utils/typeTransformer";
import { useSettings } from "@/hooks/useSettings";
import { defaultSettings } from "@/utils/settings/utils";

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
  settings = defaultSettings,
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
