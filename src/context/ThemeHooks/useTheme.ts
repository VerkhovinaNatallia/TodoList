import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  if (!context.theme) {
    throw new Error("Theme is not provided in context");
  }

  return context;
};
