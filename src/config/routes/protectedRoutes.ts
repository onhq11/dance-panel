import { Route } from "@prettylab/core/types/Route";

export const protectedRoutes: Record<string, Route> = {
  index: {
    href: "/administracja",
    label: "Administracja",
  },
  users: {
    href: "/uzytkownicy",
    label: "Użytkownicy",
  },
};
