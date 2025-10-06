import { CiGrid41, CiUser } from "react-icons/ci";
import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { MenuEntry } from "@prettylab/core/types/MenuEntry";

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
