"use client";

import { alpha, Box, Button } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SxProps } from "@mui/system";
import Link from "next/link";
import { useMenuCollapsed, useMenuHandleClose } from "@/hooks/useMenu";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

interface Props {
  children: ReactNode;
  href: string;
  sx?: SxProps;
  disabled?: boolean;
}

export default function NavButton({ children, href, sx, disabled }: Props) {
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
                  backgroundColor: "#fff",
                }
              : !disabled &&
                hover && {
                  backgroundColor: alpha("#fff", 0.5),
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
            color: "#fff",
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
