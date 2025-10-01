import promo from "@/assets/img/promo.png";
import Flex from "@/prettylab/core/src/components/layout/Flex/Flex";
import Img from "@/prettylab/core/src/components/image/Img/Img";

export default function Promo() {
  return (
    <Flex column>
      <Img
        src={promo.src}
        alt={"Promo card"}
        sx={{
          height: { xs: "400px", xl: "100%" },
          objectFit: { xs: "cover", xl: "contain" },
          borderTopLeftRadius: "24px",
          borderTopRightRadius: { xs: "24px", xl: "0px" },
          borderBottomLeftRadius: { xs: "0px", xl: "24px" },
        }}
      />
    </Flex>
  );
}
