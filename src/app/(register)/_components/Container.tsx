import { ReactNode } from "react";
import Flex from "@/prettylab/core/components/layout/Flex/Flex";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <Flex center>
      <Flex
        sx={{
          height: { xs: "100vh", md: "calc(100vh - 128px)" },
          my: { xs: 0, md: 8 },
          mx: { xs: 0, md: 16 },
          boxShadow: "-10px 30px 50px 30px rgba(0, 0, 0, 0.3)",
          width: "100%",
          borderRadius: { xs: 0, md: "24px" },
          flexDirection: { xs: "column", md: "row" },
          overflowY: { xs: "auto", md: "none" },
          overscrollBehavior: "none",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
