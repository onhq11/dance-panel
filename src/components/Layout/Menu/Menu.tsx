"use client";

import icon from "../../../../../manager/src/assets/transparent-logo.png";
import text from "../../../../../manager/src/assets/text-icon.png";
import { ReactNode, useEffect, useState } from "react";
import Flex from "../../../../../manager/src/components/Layout/Flex";
import Container from "./Container";
import Img from "../../../../../manager/src/components/Layout/Img";
import { useMenuCollapsed } from "../../../../../manager/src/hooks/useMenu";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function Menu({ children }: Props) {
  const collapsed = useMenuCollapsed();

  return (
    <Container>
      <Flex
        center
        alignCenter
        sx={{
          mt: 4,
          position: "relative",
          gap: 1.5,
          px: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "46px",
            width: "46px",
            transition: "0.2s",
            marginLeft: collapsed ? "155px" : "",
            transform: collapsed ? "scale(0.8)" : "",
          }}
        >
          <Img
            src={icon.src}
            alt={"Icon"}
            sx={{ height: "46px", width: "46px" }}
          />
        </Box>
        <Box
          sx={{
            height: "32px",
            width: "auto",
            transition: "0.2s",
            marginLeft: collapsed ? "40px" : "",
            marginRight: collapsed ? "-40px" : "",
            opacity: collapsed ? 0 : 1,
          }}
        >
          <Img
            src={text.src}
            alt={"Brand name"}
            sx={{ height: "32px", width: "auto" }}
          />
        </Box>
      </Flex>
      <Flex column sx={{ gap: 1, mt: 6 }}>
        {children}
      </Flex>
    </Container>
  );
}
