import { Box, SxProps } from "@mui/material";
import { ImgHTMLAttributes } from "react";

export interface ImgProps {
  src: string;
  alt: string;
  sx?: SxProps;
  cover?: boolean;
  mimeType?: string;
  lazyLoading?: boolean;
  useAsBackground?: boolean;
}

export default function Img({
  src,
  alt,
  sx,
  cover,
  mimeType = "image/png",
  lazyLoading,
  useAsBackground,
  ...props
}: ImgProps & ImgHTMLAttributes<HTMLImageElement>) {
  const isBase64 = (str: string) => {
    const base64Pattern =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Pattern.test(str);
  };

  const addBase64Prefix = (str: string) => {
    return `data:${mimeType};base64,${str}`;
  };

  const imageUrl = isBase64(src) ? addBase64Prefix(src) : src;

  if (useAsBackground) {
    return (
      <Box
        sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: cover ? "cover" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          ...sx,
        }}
        {...props}
      />
    );
  }

  return (
    <Box
      src={imageUrl}
      component="img"
      alt={alt}
      loading={lazyLoading ? "lazy" : "eager"}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: cover ? "cover" : "contain",
        ...sx,
      }}
      {...props}
    />
  );
}
