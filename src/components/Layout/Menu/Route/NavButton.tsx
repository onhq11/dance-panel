"use client";

import { alpha, Box, Button, useTheme } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SxProps } from "@mui/system";
import { useMenuCollapsed, useMenuHandleClose } from "../../../../../../manager/src/hooks/useMenu";
import Link from "next/link";
import Flex from "../../../../../../manager/src/components/Layout/Flex";

interface Props {
  children: ReactNode;
  href: string;
  sx?: SxProps;
  disabled?: boolean;
}

export default function NavButton({ children, href, sx, disabled }: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const handleClose = useMenuHandleClose();
  const collapsed = useMenuCollapsed();
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (pathname === href && handleClose && clicked) {
      handleClose();
    }
  }, [pathname, clicked]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Link
      href={href}
      style={{ width: "100%" }}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
      }}
    >
      <Flex
        sx={{
          width: "100%",
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            height: "20px",
            width: "2px",
            margin: "auto 0",
            ...(pathname === href
              ? {
                  backgroundColor: theme.palette.primary.main,
                }
              : !disabled &&
                hover && {
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                }),
            borderRadius: "9px",
            transition: "0.2s",
            ml: 2,
          }}
        />
        <Button
          color="secondary"
          sx={{
            width: "100%",
            color: theme.palette.primary.main,
            pl: 2,
            py: 1.25,
            borderRadius: 0,
            "& .collapse-effect": {
              transition: "0.2s",
              opacity: collapsed ? 0 : 1,
              left: collapsed ? "100px" : "40px",
            },
            transition: "0.2s",
            cursor: disabled ? "default" : "pointer",
            ...sx,
          }}
          onClick={() => setClicked(true)}
          disableRipple
        >
          {children}
        </Button>
      </Flex>
    </Link>
  );
}
