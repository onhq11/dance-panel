import Flex from "@/prettylab/core/src/components/layout/Flex/Flex";
import { Typography } from "@mui/material";

export default function TopBar() {
  return (
    <Flex between sx={{ "& p": { color: "white" }, px: 1, py: 0.5 }}>
      <Flex sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>Grupa: 12</Typography>
      </Flex>
      <Flex center sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
          Kat: 9-14
        </Typography>
      </Flex>
      <Flex sx={{ flex: 1 }} end>
        <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
          Czas: 02:34
        </Typography>
      </Flex>
    </Flex>
  );
}
