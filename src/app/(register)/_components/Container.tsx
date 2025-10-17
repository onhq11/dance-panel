import { ReactNode } from "react";
import Flex from "@prettylab/core/components/layout/Flex/Flex";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <Flex center>
      <Flex
        sx={{
          height: {
            xs: "100vh",
            xl: "calc(100vh - 128px)",
          },
          my: { xs: 0, xl: 8 },
          mx: { xs: 0, xl: 16 },
          boxShadow: "-10px 30px 50px 30px rgba(0, 0, 0, 0.3)",
          width: "100%",
          borderRadius: { xs: 0, xl: "24px" },
          flexDirection: { xs: "column", xl: "row" },
          overflowY: { xs: "auto", xl: "none" },
          overscrollBehavior: "none",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
