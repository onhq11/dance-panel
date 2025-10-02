import { PiCheckCircle, PiMinusCircle } from "react-icons/pi";
import Flex from "../../../../../../../../manager/src/components/Layout/Flex";
import Button, { ButtonProps } from "../Button/Button";
import { FlexProps } from "../Flex/Flex";

interface ModalButtonsProps {
  handleClose?: () => void;
  handleConfirm?: () => void;
  loading?: boolean;
  slotProps?: ModalButtonsSlotProps;
  cancelText?: string;
  confirmText?: string;
}

export interface ModalButtonsSlotProps {
  container?: FlexProps;
  cancel?: ButtonProps;
  confirm?: ButtonProps;
}

export default function ModalButtons({
  handleClose = () => {},
  handleConfirm = () => {},
  loading = false,
  slotProps,
  cancelText = "Cancel",
  confirmText = "Submit",
}: ModalButtonsProps) {
  return (
    <Flex
      end
      {...slotProps?.container}
      sx={{ gap: 1, mt: 4, ...slotProps?.container?.sx }}
    >
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<PiMinusCircle />}
        onClick={handleClose}
        loading={loading}
        {...slotProps?.cancel}
      >
        {cancelText}
      </Button>
      <Button
        variant="contained"
        type="submit"
        startIcon={<PiCheckCircle />}
        onClick={handleConfirm}
        loading={loading}
        {...slotProps?.confirm}
      >
        {confirmText}
      </Button>
    </Flex>
  );
}
