"use client";

import { usePathname } from "next/navigation";
import { Typography, useTheme } from "@mui/material";
import { getRouteInfoByUrl } from "@/utils/route";
import Flex from "@/components/Layout/Flex";
import DrawerExpandButton from "../../../../../dance-panel/src/components/Layout/Menu/DrawerExpandButton";
import {
  useMenuHandleOpen,
  useMenuIsDrawer,
  useMenuTitle,
} from "@/hooks/useMenu";

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
        {title || getRouteInfoByUrl(pathname)?.label}
      </Typography>
    </Flex>
  );
}
