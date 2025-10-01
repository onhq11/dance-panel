import React, { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import Flex from "../../components/Flex/Flex";
import Img from "../../components/Img/Img";
import { Box } from "@mui/material";

export interface MenuProps {
  src: string;
  children: ReactNode;
}

export default function Menu({ src, children }: MenuProps) {
  return (
    <Flex
      column
      between
      sx={{ backgroundColor: "#2c2c2c", width: "50px", height: "100%", p: 2 }}
    >
      <Box sx={{ pb: 2 }}>
        <Img src={src} alt={"Menu logo"} />
      </Box>
      <Flex column></Flex>
      <Flex column></Flex>
    </Flex>
  );
}
