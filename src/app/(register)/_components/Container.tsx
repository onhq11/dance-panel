import { ReactNode } from "react";
import Flex from "@/prettylab/core/src/components/layout/Flex/Flex";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <Flex center>
      <Flex
        sx={{
          height: { xs: "", xl: "calc(100vh - 128px)" },
          my: 8,
          mx: 16,
          boxShadow: "-10px 30px 50px 30px rgba(0, 0, 0, 0.3)",
          width: { xs: "50%", xl: "100%" },
          borderRadius: "24px",
          flexDirection: { xs: "column", xl: "row" },
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
