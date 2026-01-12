import { createTheme } from "@mui/material/styles";
type ThemeMode = "light" | "dark";
export const getDesignTokens = (mode:ThemeMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#f5f6fa",
            paper: "#ffffff",
          },
          primary: { main: "#1976d2" },
          text: {
            primary: "#212121",
            secondary: "#757575",
          },
        }
      : {
          background: {
            default: "#121212",
            paper: "#1e1e1e",
            comment: "#5c5a5aff",
          },
          primary: { main: "#42a5f5" },
          text: {
            primary: "#e0e0e0",
            secondary: "#bdbdbd",
          },
        }),
  },
  shape: { borderRadius: 5 },
  typography: { fontFamily: 'Roboto, "Cairo", sans-serif' },
});

export const createAppTheme = (mode:ThemeMode) => createTheme(getDesignTokens(mode));
