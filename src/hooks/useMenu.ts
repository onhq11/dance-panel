import { useContext } from "react";
import { MenuContext } from "@/components/Provider/MenuProvider/MenuProvider";

export const useMenuContext = () => useContext(MenuContext);

export const useMenuTitle = () => useMenuContext().title;
export const useMenuSetTitle = () => useMenuContext().setTitle;

export const useMenuIsDrawer = () => useMenuContext().isDrawer;

export const useMenuOpen = () => useMenuContext().open;
export const useMenuHandleClose = () => useMenuContext().handleClose;
export const useMenuHandleOpen = () => useMenuContext().handleOpen;

export const useMenuCollapsed = () => useMenuContext().collapsed;
export const useMenuHandleToggleCollapsed = () =>
  useMenuContext().handleToggleCollapsed;
