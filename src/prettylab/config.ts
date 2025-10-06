import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { routes } from "@/config/routes/routes";
import { menu } from "@/config/menu";

export default {
  core: {
    settings: {
      cookie_name: "settings",
      defaults: {
        ["menu-collapsed"]: false,
      },
    },
    routes: {
      protectedRoutes,
      publicRoutes: routes,
    },
    menu: {
      entries: menu,
    },
  },
};
