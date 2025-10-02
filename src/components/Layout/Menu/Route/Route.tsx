"use client";

import { ReactNode } from "react";
import Flex from "../../../../../../manager/src/components/Layout/Flex";
import NavButton from "./NavButton";
import { Route as RouteType } from "../../../../../../manager/src/utils/route";
import { SxProps } from "@mui/system";
import { Box, Typography } from "@mui/material";

interface Props {
  route: RouteType | undefined;
  icon: ReactNode;
  label?: string;
  sx?: SxProps;
  action?: ReactNode;
  disabled?: boolean;
}

export default function Route({
  route,
  icon,
  label,
  sx,
  action,
  disabled,
}: Props) {
  if (!route) {
    return <></>;
  }

  const href = route.href;
  return (
    <NavButton href={href} sx={sx} disabled={disabled}>
      <Flex between sx={{ width: "100%" }}>
        <Flex
          alignCenter
          sx={{ gap: 1.5, width: "100%", fontSize: 26, position: "relative" }}
        >
          {icon}
          <Flex
            column
            center
            className="collapse-effect"
            sx={{ position: "absolute", width: "100%", alignItems: "start" }}
          >
            <Typography component="span" sx={{ fontSize: 14 }}>
              {label || route.label}
            </Typography>
            {route.subLabel && (
              <Typography component="span" sx={{ fontSize: 8, opacity: 0.6 }}>
                {label || route.subLabel}
              </Typography>
            )}
          </Flex>
        </Flex>
        {action && <Box sx={{ mr: 1 }}>{action}</Box>}
      </Flex>
    </NavButton>
  );
}
