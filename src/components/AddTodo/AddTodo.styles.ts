import { ThemeProps } from "@/types/types";
import styled from "styled-components";

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  max-width: 600px;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    width: 100%;
    input {
      flex-grow: 1;
      padding: 8px 12px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => (theme === "dark" ? "#555" : "#ccc")};
      background-color: ${({ theme }) =>
        theme === "dark" ? "#2c2c2c" : "#fff"};
      color: ${({ theme }) => (theme === "dark" ? "#eee" : "#333")};

      &:focus {
        outline: none;
        border-color: ${({ theme }) => (theme === "dark" ? "#888" : "#888")};
      }
    }
    button {
      margin-left: 8px;
      padding: 6px 10px;
      font-size: 14px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background-color: #f44336;
      color: white;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #1976d2;
      }
    }
  }
`;