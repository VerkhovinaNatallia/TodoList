import { useTheme } from "@/context";
import { ThemedButton } from './ThemeToggle.styles'
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemedButton $theme={theme} onClick={toggleTheme}>
      Переключить на {theme === "light" ? "🌙 Темную" : "☀️ Светлую"} тему
    </ThemedButton>
  );
};



