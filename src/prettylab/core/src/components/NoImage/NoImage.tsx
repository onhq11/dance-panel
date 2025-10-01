import { SxProps, TypographyProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdOutlineInsertPhoto } from "react-icons/md";
import Flex, { FlexProps } from "../Flex/Flex";
import { IconBaseProps } from "react-icons";

export interface NoImageProps {
  label?: string;
  slotProps?: NoImageSlotProps;
}

export interface NoImageSlotProps {
  container?: FlexProps;
  icon?: IconBaseProps;
  typography?: TypographyProps;
}

const defaultSlotProps = {
  icon: {
    size: 40,
  },
  typography: {
    sx: {
      fontSize: 14,
    },
  },
};

export default function NoImage({
  label,
  slotProps = defaultSlotProps,
}: NoImageProps) {
  return (
    <Flex
      center
      alignCenter
      column
      {...slotProps?.container}
      sx={{ opacity: 0.6, height: "100%", ...slotProps?.container?.sx }}
    >
      <MdOutlineInsertPhoto {...slotProps?.icon} />
      {label && (
        <Typography
          {...slotProps?.typography}
          sx={{ whiteSpace: "nowrap", ...slotProps?.typography?.sx }}
        >
          {label}
        </Typography>
      )}
    </Flex>
  );
}
