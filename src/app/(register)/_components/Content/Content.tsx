import Flex from "@prettylab/core/components/layout/Flex/Flex";
import { Typography } from "@mui/material";
import Form from "@/app/(register)/_components/Content/Form/Form";
import { list } from "@prettylab/core/utils/api/crud";

export default async function Content() {
  const { data } = await list("http://localhost:4000/api/age-group");

  return (
    <Flex
      column
      sx={{
        backgroundColor: "white",
        borderTopRightRadius: { xs: 0, xl: "24px" },
        borderBottomRightRadius: { xs: 0, lg: "24px" },
        flex: 1,
        py: { xs: 4, md: 8 },
        px: { xs: 4, md: 12 },
        overflowY: { xs: "none", xl: "auto" },
        minWidth: { xs: "auto", md: 500, lg: 600 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 32, md: 48 },
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Rejestracja
      </Typography>
      <Form ageGroupData={data} />
    </Flex>
  );
}
