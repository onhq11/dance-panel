"use client";

import { ReactNode } from "react";
import {
  ButtonProps as MuiButtonProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import MuiButton from "@mui/material/Button";
import Link from "next/link";
import { jsx } from "@emotion/react";
import IntrinsicElements = jsx.JSX.IntrinsicElements;

export interface ButtonProps {
  children?: ReactNode;
  href?: string;
  tooltip?: string;
  disabledTooltip?: string;
  slotProps?: ButtonSlotProps;
}

export interface ButtonSlotProps {
  link?: IntrinsicElements["a"];
  tooltip?: TooltipProps;
}

export default function Button({
  children,
  disabled,
  href,
  tooltip,
  disabledTooltip,
  slotProps,
  ...props
}: ButtonProps & MuiButtonProps) {
  let body = (
    <MuiButton disabled={disabled} {...props}>
      {children}
    </MuiButton>
  );

  if (href) {
    body = (
      <Link
        passHref
        href={href}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
          }

          if (slotProps?.link?.onClick) {
            slotProps.link.onClick(event);
          }
        }}
        {...slotProps?.link}
      >
        {body}
      </Link>
    );
  }

  if (tooltip) {
    body = (
      <Tooltip
        title={disabledTooltip && disabled ? disabledTooltip : tooltip}
        {...slotProps?.tooltip}
      >
        <span>{body}</span>
      </Tooltip>
    );
  }

  if (disabledTooltip && !tooltip && disabled) {
    body = (
      <Tooltip title={disabledTooltip} {...slotProps?.tooltip}>
        <span>{body}</span>
      </Tooltip>
    );
  }

  return body;
}
