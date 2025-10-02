"use client";

import { GoSidebarExpand } from "react-icons/go";
import IconButton from "../../../../../manager/src/components/Layout/IconButton";
import { alpha, useTheme } from "@mui/material";
import Icon from "../../../../../manager/src/components/Layout/Icon";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useMenuCollapsed } from "../../../../../manager/src/hooks/useMenu";

interface Props {
  onClick: (() => void) | undefined;
}

export default function DrawerExpandButton({ onClick }: Props) {
  const theme = useTheme();
  const collapsed = useMenuCollapsed();

  return (
    <IconButton
      sx={{
        position: "absolute",
        top: 20,
        right: -16,
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
        borderRadius: "50%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: alpha(theme.palette.primary.main, 0.2),
        transition: "0.1s",
        color: alpha(theme.palette.primary.main, 0.6),
        "&:hover": {
          borderColor: alpha(theme.palette.primary.main, 0.7),
          color: alpha(theme.palette.primary.main, 0.7),
        },
        "&:active": {
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          color: theme.palette.background.default,
        },
        display: { xs: "none", lg: "flex" },
      }}
      onClick={onClick}
      color="secondary"
      disableRipple
    >
      {collapsed ? (
        <IoChevronForward size={10} color="inherit" />
      ) : (
        <IoChevronBack size={10} color="inherit" />
      )}
    </IconButton>
  );
}
