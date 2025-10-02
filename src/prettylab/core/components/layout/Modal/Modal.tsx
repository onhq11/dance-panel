import { Breakpoint, Dialog, DialogContent } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  size?: Breakpoint;
}

export default function Modal({ open, children, size = "sm", handleClose }: Props) {
  return (
    <Dialog open={open} maxWidth={size} fullWidth onClose={handleClose}>
      <DialogContent sx={{ p: 3.5 }}>{children}</DialogContent>
    </Dialog>
  );
}
