"use client";

import { alpha } from "@mui/material";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import IconButton from "@prettylab/core/components/layout/IconButton/IconButton";
import { useMenuCollapsed } from "@/hooks/useMenu";

interface Props {
  onClick: (() => void) | undefined;
}

export default function DrawerExpandButton({ onClick }: Props) {
  const collapsed = useMenuCollapsed();

  return (
    <IconButton
      sx={{
        position: "absolute",
        top: 20,
        right: -16,
        zIndex: 1,
        backgroundColor: "#fff",
        borderRadius: "50%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: alpha("#000", 0.2),
        transition: "0.1s",
        color: alpha("#000", 0.6),
        "&:hover": {
          borderColor: alpha("#000", 0.7),
          color: alpha("#000", 0.7),
        },
        "&:active": {
          backgroundColor: "#000",
          borderColor: "#000",
          color: "#fff",
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
