import Flex from "@prettylab/core/components/layout/Flex/Flex";
import { Avatar } from "@mui/material";
import { CiBellOn, CiSearch, CiSettings } from "react-icons/ci";
import IconButton from "@prettylab/core/components/layout/IconButton/IconButton";

export default function Toolbar() {
  return (
    <Flex sx={{ gap: 1, mt: { xs: 4, lg: 2 } }} around>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="primary">
          <CiSearch />
        </IconButton>
      </Flex>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="primary">
          <CiBellOn />
        </IconButton>
      </Flex>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="primary">
          <CiSettings />
        </IconButton>
      </Flex>
      <Flex alignCenter>
        <IconButton sx={{ fontSize: 26 }} color="primary">
          <Avatar />
        </IconButton>
      </Flex>
    </Flex>
  );
}
