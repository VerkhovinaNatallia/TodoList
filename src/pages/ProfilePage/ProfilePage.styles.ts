import { ThemeProps } from "@/types/types";
import styled from "styled-components";


export const Container = styled.div<ThemeProps>`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#2d2d2d" : "#ffffff"};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)"};
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#404040" : "#e0e0e0")};
  h1 {
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.2rem;
    font-weight: 600;
  }

  div {
    margin-bottom: 3rem;
    padding: 2rem;
    background-color: ${({ theme }) =>
      theme === "dark" ? "#3c3c3c" : "#f8f9fa"};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => (theme === "dark" ? "#555" : "#dee2e6")};
    h2 {
    }
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#495057")};
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid
      ${({ theme }) => (theme === "dark" ? "#555" : "#dee2e6")};
    padding-bottom: 0.5rem;
  }
  .conteinerInfo {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    div {
      p {
        margin: 0;
        font-size: 1rem;
      }

      strong {
        color: ${({ theme }) => (theme === "dark" ? "#4dabf7" : "#007bff")};
        font-weight: 600;
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      span {
        color: ${({ theme }) => (theme === "dark" ? "#cccccc" : "#666666")};
        font-size: 1.1rem;
      }
    }
  }
`;

export const LoadingText = styled.div<ThemeProps>`
  text-align: center;
  color: ${({ theme }) => (theme === "dark" ? "#cccccc" : "#666666")};
  font-size: 1.2rem;
  padding: 2rem;
`;
