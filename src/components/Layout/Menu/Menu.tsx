"use client";

import icon from "@prettylab/core/assets/transparent-logo.png";
import text from "@prettylab/core/assets/text-icon.png";
import Container from "./Container";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import Flex from "@prettylab/core/components/layout/Flex/Flex";
import Img from "@prettylab/core/components/image/Img/Img";
import { useMenuCollapsed } from "@/hooks/useMenu";

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
