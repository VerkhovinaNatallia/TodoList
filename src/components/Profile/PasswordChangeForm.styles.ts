import { ThemeProps } from "@/types/types";
import styled from "styled-components";


export const Container = styled.form<ThemeProps>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    input {
      padding: 12px 16px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => (theme === "dark" ? "#555" : "#ccc")};
      background-color: ${({ theme }) =>
        theme === "dark" ? "#2d2d2d" : "#ffffff"};
      color: ${({ theme }) => (theme === "dark" ? "#eeeeee" : "#333333")};
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => (theme === "dark" ? "#888" : "#007bff")};
        box-shadow: ${({ theme }) =>
          theme === "dark"
            ? "0 0 0 3px rgba(136, 136, 136, 0.3)"
            : "0 0 0 3px rgba(0, 123, 255, 0.25)"};
      }

      &::placeholder {
        color: ${({ theme }) => (theme === "dark" ? "#888" : "#999")};
      }
    }
    span {
      background-color: ${({ theme }) =>
        theme === "dark" ? "#224422" : "#d4edda"};
      color: ${({ theme }) => (theme === "dark" ? "#6bc46b" : "#155724")};
      padding: 12px;
      border-radius: 6px;
      border: 1px solid
        ${({ theme }) => (theme === "dark" ? "#336633" : "#c3e6cb")};
      font-size: 0.9rem;
      text-align: center;
    }
  }
  .successMessage {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#224422" : "#d4edda"};
    color: ${({ theme }) => (theme === "dark" ? "#6bc46b" : "#155724")};
    padding: 12px;
    border-radius: 6px;
    border: 1px solid
      ${({ theme }) => (theme === "dark" ? "#336633" : "#c3e6cb")};
    font-size: 0.9rem;
    text-align: center;
  }
  .errorMessage {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#442222" : "#f8d7da"};
    color: ${({ theme }) => (theme === "dark" ? "#ff6b6b" : "#721c24")};
    padding: 12px;
    border-radius: 6px;
    border: 1px solid
      ${({ theme }) => (theme === "dark" ? "#663333" : "#f5c6cb")};
    font-size: 0.9rem;
    text-align: center;
  }
`;

export const SubmitButton = styled.button<ThemeProps & { disabled: boolean }>`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? "#6c757d" : theme === "dark" ? "#007bff" : "#007bff"};
  color: white;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#0056b3" : "#0056b3"};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
