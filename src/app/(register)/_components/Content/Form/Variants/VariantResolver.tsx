import { registrationType } from "@/assets/data/registrationType";
import Solo from "@/app/(register)/_components/Content/Form/Variants/Solo/Solo";
import Formation from "@/app/(register)/_components/Content/Form/Variants/Formation/Formation";

type Props = {
  type: string;
  ageGroupData: any;
};

export default function VariantResolver({ type, ageGroupData }: Props) {
  if (type === registrationType.solo) {
    return <Solo ageGroupData={ageGroupData} />;
  }

  if (type === registrationType.formation) {
    return <Formation />;
  }

  return null;
}
