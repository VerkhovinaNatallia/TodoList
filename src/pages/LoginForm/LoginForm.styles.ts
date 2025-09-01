import { ThemeProps } from "@/types/types";
import styled from "styled-components";


export const Container = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1a1a1a" : "#f5f5f5"};
  .login_form {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#2d2d2d" : "#ffffff"};
    padding: 2rem;
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 4px 20px rgba(0, 0, 0, 0.3)"
        : "0 4px 20px rgba(0, 0, 0, 0.1)"};
    width: 100%;
    max-width: 400px;
    border: 1px solid
      ${({ theme }) => (theme === "dark" ? "#404040" : "#e0e0e0")};
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
      font-size: 1.8rem;
      font-weight: 600;
    }
  }
  form {
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
          theme === "dark" ? "#3c3c3c" : "#fff"};
        color: ${({ theme }) => (theme === "dark" ? "#eee" : "#333")};
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: ${({ theme }) =>
            theme === "dark" ? "#888" : "#007bff"};
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
        color: #dc3545;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
    .server_error {
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
  }
  p {
    text-align: center;
    margin-top: 1.5rem;
    color: ${({ theme }) => (theme === "dark" ? "#ccc" : "#666")};
    font-size: 0.9rem;

    a {
      color: ${({ theme }) => (theme === "dark" ? "#4dabf7" : "#007bff")};
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: ${({ theme }) => (theme === "dark" ? "#74c0fc" : "#0056b3")};
        text-decoration: underline;
      }
    }
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
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#0056b3" : "#0056b3"};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
