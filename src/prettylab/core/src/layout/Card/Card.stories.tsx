import React from "react";
import Card from "./Card";
import { Meta, StoryObj } from "@storybook/react";
import Flex from "../../components/Flex/Flex";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
};

export default meta;

const header = `Lorem ipsum`;
const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus sodales lacus, in pharetra nunc tristique ac. Pellentesque porta arcu leo, in rhoncus nisl venenatis et. Nullam ultricies, mauris nec sagittis egestas, nisi ex pulvinar sapien, ut congue lacus justo at quam. Maecenas vulputate tortor et facilisis sagittis.`;

export const main: StoryObj<typeof Card> = {
  render: () => (
    <Card color="primary" header={header}>
      {content}
    </Card>
  ),
};

export const secondary: StoryObj<typeof Card> = {
  render: () => (
    <Card color="secondary" header={header}>
      {content}
    </Card>
  ),
};

export const succres: StoryObj<typeof Card> = {
  render: () => (
    <Card color="success" header={header}>
      {content}
    </Card>
  ),
};

export const warning: StoryObj<typeof Card> = {
  render: () => (
    <Card color="warning" header={header}>
      {content}
    </Card>
  ),
};

export const info: StoryObj<typeof Card> = {
  render: () => (
    <Card color="info" header={header}>
      {content}
    </Card>
  ),
};

export const error: StoryObj<typeof Card> = {
  render: () => (
    <Card color="error" header={header}>
      {content}
    </Card>
  ),
};
