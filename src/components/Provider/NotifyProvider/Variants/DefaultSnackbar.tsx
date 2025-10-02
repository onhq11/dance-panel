import { Ref, forwardRef } from "react";
import { PiCheck } from "react-icons/pi";

import Snackbar, {
  SnackbarProps,
} from "@/components/Provider/NotifyProvider/Variants/Snackbar";
import { useTheme } from "@mui/material";
import Flex from "@/components/Layout/Flex";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";

function DefaultSnackbar(
  { id, message, action, options }: SnackbarProps,
  ref: Ref<unknown> | undefined,
) {
  const theme = useTheme();
  const { link, icon } = options ?? {};

  const linkElement = link ? (
    <Flex sx={{ width: "100%" }}>
      <Link href={link?.href ?? "#"}>{link?.label}</Link>
    </Flex>
  ) : null;

  return (
    <Snackbar
      ref={ref}
      id={id}
      message={message}
      action={action}
      icon={icon || <MdOutlineEmail size={20} />}
      color={theme.palette.primary}
    >
      {linkElement}
    </Snackbar>
  );
}

export default forwardRef(DefaultSnackbar);
