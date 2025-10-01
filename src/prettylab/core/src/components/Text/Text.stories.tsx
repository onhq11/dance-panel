import React from "react";
import Text from "./Text";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
};

export default meta;

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a placerat purus, nec gravida neque.`;

export const main: StoryObj<typeof Text> = {
  render: () => <Text>{content}</Text>,
};

export const h1: StoryObj<typeof Text> = {
  render: () => <Text variant="h1">{content}</Text>,
};

export const h2: StoryObj<typeof Text> = {
  render: () => <Text variant="h2">{content}</Text>,
};

export const h3: StoryObj<typeof Text> = {
  render: () => <Text variant="h3">{content}</Text>,
};

export const h4: StoryObj<typeof Text> = {
  render: () => <Text variant="h4">{content}</Text>,
};

export const h5: StoryObj<typeof Text> = {
  render: () => <Text variant="h5">{content}</Text>,
};

export const h6: StoryObj<typeof Text> = {
  render: () => <Text variant="h6">{content}</Text>,
};

export const caption: StoryObj<typeof Text> = {
  render: () => <Text variant="caption">{content}</Text>,
};

export const card_header: StoryObj<typeof Text> = {
  render: () => <Text variant="card_header">{content}</Text>,
};
