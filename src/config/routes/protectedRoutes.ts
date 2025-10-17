import { Route } from "@prettylab/core/types/Route";

export const protectedRoutes: Record<string, Route> = {
  index: {
    href: "/administracja",
    label: "Użytkownicy",
  },
  age_group: {
    href: "/grupy-wiekowe",
    label: "Grupy wiekowe",
  },
  competition: {
    href: "/zawody",
    label: "Zawody",
  },
  coach: {
    href: "/trenerzy",
    label: "Trenerzy",
  },
};
