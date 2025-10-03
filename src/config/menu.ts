import { ElementType } from "react";
import { CiGrid41, CiUser } from "react-icons/ci";
import { Route } from "@prettylab/core/types/Route";
import { protectedRoutes } from "@/config/routes/protectedRoutes";

export interface MenuEntry {
  route: Route;
  icon: ElementType;
}

export const menu: Array<MenuEntry> = [
  {
    route: protectedRoutes.index,
    icon: CiGrid41,
  },
  {
    route: protectedRoutes.users,
    icon: CiUser,
  },
];
