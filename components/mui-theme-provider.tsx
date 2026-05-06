"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#abc7ff",
      contrastText: "#002f66",
    },
    secondary: {
      main: "#ffb77d",
      contrastText: "#4d2600",
    },
    background: {
      default: "#10131b",
      paper: "#181c23",
    },
    text: {
      primary: "#e0e2ed",
      secondary: "#c1c6d7",
    },
    divider: "#414754",
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-lexend), Lexend, Arial, Helvetica, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.33,
    },
    body1: {
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderColor: "#414754",
          backgroundImage: "none",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
});

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
