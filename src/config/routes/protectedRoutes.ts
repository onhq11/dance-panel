import { Route } from "../../../../manager/src/utils/route";

export const protectedRoutes: Record<string, Route> = {
  index: {
    href: "/dashboard",
    label: "Dashboard",
  },
  docs: {
    href: "/docs",
    label: "Docs",
  },
};
