import Flex from "@/prettylab/core/src/components/layout/Flex/Flex";
import { Typography } from "@mui/material";
import Form from "@/app/(register)/_components/Content/Form/Form";

export default function Content() {
  return (
    <Flex
      column
      sx={{
        backgroundColor: "white",
        borderTopRightRadius: { xs: "", xl: "24px" },
        borderBottomRightRadius: "24px",
        borderBottomLeftRadius: { xs: "24px", xl: "" },
        flex: 1,
        py: 8,
        px: 12,
        overflowY: "auto",
      }}
    >
      <Typography
        sx={{
          fontSize: 48,
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Rejestracja
      </Typography>
      <Form />
    </Flex>
  );
}
