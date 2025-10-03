"use client";

import Flex from "@prettylab/core/components/layout/Flex/Flex";
import TopBar from "@/app/(judging)/sedziowie/_components/TopBar";
import { dancers } from "@/assets/data/dancers";
import Dancer from "@/app/(judging)/sedziowie/_components/Dancer/Dancer";
import Submit from "@/app/(judging)/sedziowie/_components/Submit";
import { useState } from "react";

export default function Page() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Flex sx={{ height: "100vh", overflowY: "hidden", gap: 2 }} column>
      <TopBar />
      <Flex sx={{ flex: 1, gap: 2 }} column>
        {dancers.map((row: any, index: number) => (
          <Dancer key={index} row={row} submitted={submitted} />
        ))}
      </Flex>
      <Submit submitted={submitted} setSubmitted={setSubmitted} />
    </Flex>
  );
}
