"use client";

import { usePathname } from "next/navigation";
import { Typography, useTheme } from "@mui/material";
import Flex from "@prettylab/core/components/layout/Flex/Flex";
import {
  useMenuHandleOpen,
  useMenuIsDrawer,
  useMenuTitle,
} from "@/hooks/useMenu";
import DrawerExpandButton from "@/components/Layout/Menu/DrawerExpandButton";
import { getRouteObjectByPathname } from "@prettylab/core/utils/route/route";

export default function Heading() {
  const pathname = usePathname();
  const theme = useTheme();
  const handleOpen = useMenuHandleOpen();
  const isDrawer = useMenuIsDrawer();
  const title = useMenuTitle();

  return (
    <Flex alignCenter sx={{ mt: 4, gap: 2 }}>
      {isDrawer && <DrawerExpandButton onClick={handleOpen} />}
      <Typography
        sx={{
          fontWeight: 100,
          fontSize: 40,
          fontFamily: "sans-serif",
          color: theme.palette.text.secondary,
          textTransform: "capitalize",
        }}
      >
        {title || getRouteObjectByPathname(pathname)?.label}
      </Typography>
    </Flex>
  );
}
