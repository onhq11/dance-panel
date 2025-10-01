"use client";

import Flex from "@/prettylab/core/src/components/layout/Flex/Flex";
import { Typography } from "@mui/material";
import Score from "@/app/(judging)/sedziowie/_components/Dancer/Score";

type Data = {
  number: number;
  first_name: string;
  last_name: string;
  dance_club: string;
};

type Props = {
  row: Data;
  submitted: boolean;
};

export default function Dancer({ row, submitted }: Props) {
  return (
    <Flex
      between
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",
        "& p": { color: "white" },
        px: 2,
        height: "100px",
      }}
    >
      <Flex alignCenter sx={{ gap: 2 }}>
        <Typography sx={{ fontSize: 48 }}>{row.number}</Typography>
        <Flex column>
          <Typography sx={{ fontSize: 24 }}>
            {row.first_name} {row.last_name}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>{row.dance_club}</Typography>
        </Flex>
      </Flex>
      <Score submitted={submitted} />
    </Flex>
  );
}
