import promo from "@/assets/img/promo.png";
import Flex from "@/prettylab/core/components/layout/Flex/Flex";
import Img from "@/prettylab/core/components/image/Img/Img";

export default function Promo() {
  return (
    <Flex column>
      <Img
        src={promo.src}
        alt={"Promo card"}
        sx={{
          height: { xs: "200px", md: "100%" },
          objectFit: { xs: "cover", md: "contain" },
          borderTopLeftRadius: { xs: 0, md: "24px" },
          borderBottomLeftRadius: { xs: 0, md: "24px" },
        }}
      />
    </Flex>
  );
}
