import React from "react";
import Flex from "./Flex";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

const meta: Meta<typeof Flex> = {
  title: "Components/Flex",
  component: Flex,
};

export default meta;

export const main: StoryObj<typeof Flex> = {
  render: () => (
    <Flex>
      <Box sx={{ backgroundColor: "red", height: 120, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 120, width: 120 }} />
    </Flex>
  ),
};

export const wrap: StoryObj<typeof Flex> = {
  render: () => (
    <Flex wrap>
      <Box sx={{ backgroundColor: "red", minWidth: 350, height: 120 }} />
      <Box sx={{ backgroundColor: "blue", minWidth: 350, height: 120 }} />
    </Flex>
  ),
};

export const alignCenter: StoryObj<typeof Flex> = {
  render: () => (
    <Flex alignCenter>
      <Box sx={{ backgroundColor: "red", height: 200, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 150, width: 120 }} />
    </Flex>
  ),
};

export const column: StoryObj<typeof Flex> = {
  render: () => (
    <Flex column>
      <Box sx={{ backgroundColor: "red", height: 120, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 120, width: 120 }} />
    </Flex>
  ),
};

export const between: StoryObj<typeof Flex> = {
  render: () => (
    <Flex between sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "red", height: 120, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 120, width: 120 }} />
    </Flex>
  ),
};

export const around: StoryObj<typeof Flex> = {
  render: () => (
    <Flex around sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "red", height: 120, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 120, width: 120 }} />
    </Flex>
  ),
};

export const center: StoryObj<typeof Flex> = {
  render: () => (
    <Flex center sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "red", height: 120, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 120, width: 120 }} />
    </Flex>
  ),
};

export const end: StoryObj<typeof Flex> = {
  render: () => (
    <Flex end sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "red", height: 120, width: 120 }} />
      <Box sx={{ backgroundColor: "blue", height: 120, width: 120 }} />
    </Flex>
  ),
};
