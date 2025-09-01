import styled from "styled-components";

export const ThemedButton = styled.button<{ $theme: "light" | "dark" }>`
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${({ theme }) => (theme === "light" ? "black" : "white")};
  color: ${({ theme }) => (theme === "light" ? "white" : "black")};

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? "#222" : "#f0f0f0"};
  }
`;