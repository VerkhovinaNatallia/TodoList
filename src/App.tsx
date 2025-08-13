import { ThemeProvider as StyledThemeProvider } from "styled-components";
import styled from "styled-components";
import ThemeToggle from "@components/ThemeToggle";
import { ThemeProvider } from "@context/ThemeProvider/ThemeProvaider";
import { useTheme } from "@context/ThemeHooks/useTheme";
import TodoList from "@components/TodoList/TodoList";
import { Container } from "@mui/material";

const lightTheme = { background: "white", text: "black" };
const darkTheme = { background: "#121212", text: "white" };

type Theme = {
  background: string;
  text: string;
};

const AppContainer = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const InnerApp = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AppContainer>
        <ThemeToggle />
        <Container>
          <TodoList />
        </Container>
      </AppContainer>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
}

export default App;
