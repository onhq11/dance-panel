import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import LazyLoadImage from "./LazyLoadImage";
import Flex from "../Flex/Flex";

const meta: Meta<typeof LazyLoadImage> = {
  title: "Components/LazyLoadImage",
  component: LazyLoadImage,
};

export default meta;

const urlImage = `https://picsum.photos/1920/1080`;

export const main: StoryObj<typeof LazyLoadImage> = {
  render: () => (
    <Flex>
      <LazyLoadImage
        src={urlImage}
        alt="lazy load image"
        width="auto"
        height="160px"
      />
    </Flex>
  ),
};

export const error: StoryObj<typeof LazyLoadImage> = {
  render: () => (
    <Flex>
      <LazyLoadImage
        src={"about:blank"}
        alt="lazy load image"
        width="320px"
        height="160px"
        slotProps={{
          noImage: {
            label: "Error loading image",
          },
        }}
      />
    </Flex>
  ),
};

export const forceLoading: StoryObj<typeof LazyLoadImage> = {
  render: () => (
    <Flex>
      <LazyLoadImage
        src={urlImage}
        alt="lazy load image"
        width="320px"
        height="160px"
        forceLoading
      />
    </Flex>
  ),
};
