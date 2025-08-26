import React, { useState, useEffect, type ChangeEvent, type FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { LoginData, RootState } from "../types/types";
import { clearError, loginUser } from "../store/auth/authSlice";
import type { AppDispatch } from "../store/store";
import styled from "styled-components";
import { useTheme } from "../context/ThemeHooks/useTheme";

interface ThemeProps {
  theme: "light" | "dark";
}

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, token } = useSelector(
    (state: RootState) => state.auth
  );
  const { theme } = useTheme();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name as keyof LoginData]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  return (
    <Container theme={theme}>
      <div className="login_form">
        <h2>Вход в систему</h2>
        <form onSubmit={handleSubmit}>
          <div >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div >
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          {error && <div className="server_error">{error}</div>}
          <SubmitButton
            type="submit"
            disabled={status !== "idle"}
            theme={theme}
          >
            {status !== "idle" ? "Вход..." : "Войти"}
          </SubmitButton>
        </form>
        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div<ThemeProps>`
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

const SubmitButton = styled.button<ThemeProps & { disabled: boolean }>`
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
