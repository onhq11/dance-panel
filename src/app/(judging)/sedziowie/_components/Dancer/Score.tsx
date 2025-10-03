"use client";

import Picker from "react-mobile-picker";
import { useState } from "react";
import { Box } from "@mui/material";

const availableScores = Array.from({ length: 21 }, (_, i) => i * 0.5);

type Props = {
  submitted: boolean;
};

export default function Score({ submitted }: Props) {
  const [currentScore, setCurrentScore] = useState({ score: 0 });

  return (
    <Box
      sx={{
        "& div": {
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 58,
          ...(submitted && {
            pointerEvents: "none",
            touchAction: "none",
            opacity: 0.5,
          }),
        },
      }}
    >
      <Picker
        value={currentScore}
        onChange={setCurrentScore}
        height={100}
        itemHeight={64}
      >
        <Picker.Column name={"score"}>
          {availableScores.map((score) => (
            <Picker.Item key={score} value={score}>
              {score}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </Box>
  );
}
