import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme/theme";
import type { ThemeContextType, ThemeMode } from "../types/theme";
import { THEME_MODE } from "../constants/theme";

const ThemeContext = createContext<ThemeContextType>({
  themeMode: THEME_MODE.dark,
  toggleThemeMode: () => {},
});

export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme === THEME_MODE.dark || savedTheme === THEME_MODE.light) {
      return savedTheme;
    }
    return THEME_MODE.dark;
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) =>
      prev === THEME_MODE.dark ? THEME_MODE.light : THEME_MODE.dark,
    );
  };

  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
