import { ReactNode } from "react";
import env from "@/env";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import MenuProvider from "@/components/Provider/MenuProvider/MenuProvider";
import { getServerSettings } from "@prettylab/core/utils/settings/ssrSettings";
import Flex from "@prettylab/core/components/layout/Flex/Flex";
import Menu from "@/components/Layout/Menu/Menu";
import Topbar from "@/components/Layout/Topbar/Topbar";
import Route from "@/components/Layout/Menu/Route/Route";
import "./main.css";
import { menu } from "@/config/menu";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Administracja - FOCUS ON BATTLE",
};

export default async function Layout({ children }: Props) {
  const settings = await getServerSettings();

  if (!env.page.management) {
    return notFound();
  }

  return (
    <MenuProvider settings={settings}>
      <Flex>
        <Menu>
          {menu.map(({ route, icon: Icon }, index: number) => (
            <Route key={index} route={route} icon={<Icon />} />
          ))}
        </Menu>
        <Flex column sx={{ flex: 1, height: "100vh" }}>
          <Topbar />
          <Flex column sx={{ flex: 1, mx: 4, mb: 4, mt: 3, overflowX: "auto" }}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </MenuProvider>
  );
}
