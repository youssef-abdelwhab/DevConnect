import { SetStateAction } from "react";
export type ThemeMode = "light" | "dark";
export interface ThemeModeType {
  mode: ThemeMode;
  setMode: React.Dispatch<SetStateAction<ThemeMode>>;
}
