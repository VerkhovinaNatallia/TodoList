import  { type FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../context/ThemeHooks/useTheme";

interface ThemeProps {
  theme: "light" | "dark";
}

const NotFoundPage: FC = () => {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <h1>404</h1>

      <h2>Страница не найдена</h2>

      <HomeLink to="/" theme={theme}>
        На главную
      </HomeLink>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1a1a1a" : "#f8f9fa"};
  h1 {
    font-size: 6rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => (theme === "dark" ? "#ff6b6b" : "#dc3545")};
    text-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 0 20px rgba(255, 107, 107, 0.3)"
        : "0 0 10px rgba(220, 53, 69, 0.2)"};

    @media (max-width: 768px) {
      font-size: 4rem;
    }
  }
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const HomeLink = styled(Link)<ThemeProps>`
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#007bff" : "#007bff"};
  color: white;
  border: 2px solid transparent;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#0056b3" : "#0056b3"};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 4px 15px rgba(0, 123, 255, 0.3)"
        : "0 4px 15px rgba(0, 123, 255, 0.2)"};
  }

  &:active {
    transform: translateY(0);
  }
`;
