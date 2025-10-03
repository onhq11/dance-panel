import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import Heading from "@/components/Layout/Topbar/Heading";
import Toolbar from "@/components/Layout/Topbar/Toolbar";

export default function Topbar() {
  return (
    <Flex alignCenter between sx={{ gap: 2, mx: 4 }}>
      <Heading />
      <Toolbar />
    </Flex>
  );
}
