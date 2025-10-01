import { IconButtonProps } from "@mui/material";
import IconButton from "../IconButton/IconButton";

export interface IconProps {
  color?: string;
}

export default function Icon({
  color,
  children,
  ...props
}: IconProps & IconButtonProps) {
  return (
    <IconButton
      color={color || "primary"}
      disableRipple
      {...props}
      sx={{ p: 0, cursor: "default", ...props.sx }}
    >
      {children}
    </IconButton>
  );
}
