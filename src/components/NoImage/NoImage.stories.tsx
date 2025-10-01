import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import NoImage from "./NoImage";
import Flex from "../Flex/Flex";

const meta: Meta<typeof NoImage> = {
  title: "Components/NoPhotos",
  component: NoImage,
};

export default meta;

export const main: StoryObj<typeof NoImage> = {
  render: () => (
    <Flex>
      <NoImage />
    </Flex>
  ),
};

export const withLabel: StoryObj<typeof NoImage> = {
  render: () => (
    <Flex>
      <NoImage label="No photos" />
    </Flex>
  ),
};
