import { ReactNode } from "react";
import { Metadata } from "next";
import Providers from "@/components/Provider/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Zawody taneczne 2026",
};

export default function Layout({ children }: Props) {
  return (
    <html lang="pl" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider
          options={{ enableCssLayer: true, prepend: true, key: "css" }}
        >
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
