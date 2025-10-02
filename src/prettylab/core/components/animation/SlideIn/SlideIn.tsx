"use client";

import { Box, BoxProps } from "@mui/material";
import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

export interface SlideInProps {
  children: ReactNode;
  slotProps?: SlideInSlotProps;
}

export interface SlideInSlotProps {
  container?: BoxProps;
  motionDiv?: Omit<HTMLMotionProps<"div">, "ref">;
}

export default function SlideIn({ children, slotProps }: SlideInProps) {
  return (
    <Box className="animated" {...slotProps?.container}>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 30, opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...slotProps?.motionDiv}
      >
        {children}
      </motion.div>
    </Box>
  );
}
