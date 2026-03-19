import type { THEME_MODE } from "../constants/theme";

export type ThemeMode = (typeof THEME_MODE)[keyof typeof THEME_MODE];

export type ThemeContextType = {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
};
