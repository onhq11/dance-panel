"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    disabled: Palette["primary"];
  }
  interface PaletteOptions {
    disabled?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#003128",
      contrastText: "#fff",
    },
    success: {
      main: "#116c3f",
      contrastText: "#fff",
    },
    disabled: {
      main: "#505050",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "15px",
          borderRadius: "8px",
        },
      },
    },
  },
  cssVariables: true,
});

export default theme;
