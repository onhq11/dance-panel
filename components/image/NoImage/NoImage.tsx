import { TypographyProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdOutlineInsertPhoto } from "react-icons/md";
import Flex, { FlexProps } from "../../layout/Flex/Flex";
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

export default function NoImage({ label, slotProps }: NoImageProps) {
  return (
    <Flex
      center
      alignCenter
      column
      {...slotProps?.container}
      sx={{ opacity: 0.6, height: "100%", ...slotProps?.container?.sx }}
    >
      <MdOutlineInsertPhoto size={40} {...slotProps?.icon} />
      {label && (
        <Typography
          {...slotProps?.typography}
          sx={{
            whiteSpace: "nowrap",
            fontSize: 14,
            ...slotProps?.typography?.sx,
          }}
        >
          {label}
        </Typography>
      )}
    </Flex>
  );
}
