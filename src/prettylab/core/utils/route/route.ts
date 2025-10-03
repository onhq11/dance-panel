import { routes } from "@/config/routes/routes";
import { protectedRoutes } from "@/config/routes/protectedRoutes";
import { Route } from "@prettylab/core/types/Route";

// Get route core function which returns a route based on a callback condition
const getRoute = (callback: (item: any) => boolean): Route => {
  const routesArray = Object.values(routes);
  const protectedRoutesArray = Object.values(protectedRoutes);
  const failbackRoute = routes.index;
  const combinedRoutes = [...routesArray, ...protectedRoutesArray];
  return combinedRoutes.find(callback) || failbackRoute;
};

// Checks if url2 matches the pattern defined in url
// e.g., isRoute('/user/:id', '/user/123') => true
export const matchRoutePattern = (url: string, url2: string) => {
  const regexPattern = url.replace(/:[^\s/]+/g, "([\\w-]+)");
  const regex = new RegExp(`^${regexPattern}$`);

  return regex.test(url2);
};

// Get route object by pathname
export const getRouteObjectByPathname = (route: string) => {
  return getRoute((item: any) => matchRoutePattern(item.href, route));
};

// Checks if given pathname is a protected route
export const isProtectedRoute = (href: string) =>
  Object.values(protectedRoutes).some((route) => {
    return matchRoutePattern(route.href, href);
  });

// Checks if given pathname is a public route
export const isPublicRoute = (href: string) =>
  Object.values(routes).some((route) => {
    return matchRoutePattern(route.href, href);
  });

// Generate path with url params and query params
export function generatePath(route: any, params: any = {}, query?: any) {
  const path = route.replace(/:(\w+)/g, (_: any, key: any) => {
    if (params[key] !== undefined) {
      return params[key];
    }
    throw new Error(`Missing parameter: ${key}`);
  });

  const queryEntries = Object.entries(query).filter(
    ([, value]) => value !== undefined && value !== null,
  );

  if (queryEntries.length === 0) {
    return path;
  }

  const queryString = queryEntries
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

  return `${path}?${queryString}`;
}
