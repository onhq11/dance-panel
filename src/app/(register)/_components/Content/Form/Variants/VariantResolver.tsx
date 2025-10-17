import { registrationType } from "@/enums/registrationType";
import Solo from "@/app/(register)/_components/Content/Form/Variants/Solo/Solo";
import Formation from "@/app/(register)/_components/Content/Form/Variants/Formation/Formation";

type Props = {
  type: string;
  soloGroups: Array<any>;
  formationGroups: Array<any>;
};

export default function VariantResolver({
  type,
  soloGroups,
  formationGroups,
}: Props) {
  if (type === registrationType.solo) {
    return <Solo soloGroups={soloGroups} />;
  }

  if (type === registrationType.formation) {
    return (
      <Formation soloGroups={soloGroups} formationGroups={formationGroups} />
    );
  }

  return null;
}
