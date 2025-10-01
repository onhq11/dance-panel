import React from "react";
import Menu from "./Menu";
import { Meta, StoryObj } from "@storybook/react";
import Flex from "../../components/Flex/Flex";

const meta: Meta<typeof Menu> = {
  title: "Layout/Menu",
  component: Menu,
};

export default meta;

export const main: StoryObj<typeof Menu> = {
  render: () => (
    <Flex sx={{ height: "calc(100vh - 60px)" }}>
      <Menu src="https://get.onhq.pl/p-trans.png">aa</Menu>
    </Flex>
  ),
};
