import Flex from "@prettylab/core/components/layout/Flex/Flex";
import Coach from "@/app/(register)/_components/Content/Form/Variants/Formation/Coach/Coach";
import FormationInfo from "@/app/(register)/_components/Content/Form/Variants/Formation/FormationInfo/FormationInfo";
import Dancers from "@/app/(register)/_components/Content/Form/Variants/Formation/Dancers/Dancers";

interface Props {
  soloGroups: Array<any>;
  formationGroups: Array<any>;
}

export default function Formation({ soloGroups, formationGroups }: Props) {
  return (
    <Flex column sx={{ gap: 10, mt: 5 }}>
      <Coach />
      <FormationInfo formationGroups={formationGroups} />
      <Dancers soloGroups={soloGroups} />
    </Flex>
  );
}
