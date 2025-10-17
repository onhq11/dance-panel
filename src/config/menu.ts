import { CiCalendarDate, CiDumbbell, CiPizza, CiUser } from "react-icons/ci";
import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { MenuEntry } from "@prettylab/core/types/MenuEntry";

export const menu: Array<MenuEntry> = [
  {
    route: protectedRoutes.index,
    icon: CiUser,
  },
  {
    route: protectedRoutes.age_group,
    icon: CiCalendarDate,
  },
  {
    route: protectedRoutes.competition,
    icon: CiDumbbell,
  },
  {
    route: protectedRoutes.coach,
    icon: CiPizza,
  },
];
