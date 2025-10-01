import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Img from "./Img";

const meta: Meta<typeof Img> = {
  title: "Components/Img",
  component: Img,
};

export default meta;

const urlImage = `https://picsum.photos/1920/1080`;

export const main: StoryObj<typeof Img> = {
  render: () => (
    <Img src={urlImage} alt={"logo"} sx={{ height: 180, width: "auto" }} />
  ),
};

export const cover: StoryObj<typeof Img> = {
  render: () => (
    <Img src={urlImage} alt={"logo"} cover sx={{ height: 180, width: 180 }} />
  ),
};
