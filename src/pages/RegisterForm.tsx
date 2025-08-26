import {
  useState,
  useEffect,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RegisterData, RegisterErrors, RootState } from "../types/types";
import type { AppDispatch } from "../store/store";
import { clearError, registerUser } from "../store/auth/authSlice";
import styled from "styled-components";
import { useTheme } from "../context/ThemeHooks/useTheme";

interface ThemeProps {
  theme: "light" | "dark";
}

const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    age: undefined,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

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
    const newErrors: RegisterErrors = {};

    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    if (formData.age !== undefined) {
      if (formData.age < 0 || formData.age > 150) {
        newErrors.age = "Возраст должен быть от 0 до 150 лет";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = { ...formData };
      if (dataToSend.age === undefined) {
        delete dataToSend.age;
      }
      const result = await dispatch(registerUser(dataToSend));
      if (registerUser.fulfilled.match(result)) {
        navigate("/");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "number" && name === "age") {
      setFormData({
        ...formData,
        [name]: value === "" ? undefined : parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name as keyof RegisterErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <Container theme={theme}>
      <div className="register_form">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div>
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

          <div>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <div>
            <input
              type="number"
              name="age"
              placeholder="Возраст"
              value={formData.age === undefined ? "" : formData.age}
              onChange={handleChange}
              min="0"
              max="150"
            />
            <span className="optional">(необязательно)</span>
            {errors.age && <span>{errors.age}</span>}
          </div>

          {error && <div className="serverError">{error}</div>}

          <SubmitButton
            type="submit"
            disabled={status !== "idle"}
            theme={theme}
          >
            {status !== "idle" ? "Регистрация..." : "Зарегистрироваться"}
          </SubmitButton>
        </form>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти здесь</Link>
        </p>
      </div>
    </Container>
  );
};

export default RegisterForm;

const Container = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1a1a1a" : "#f5f5f5"};
  .register_form {
    width: 100%;
    max-width: 400px;
    background-color: ${({ theme }) =>
      theme === "dark" ? "#2d2d2d" : "#ffffff"};
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
        theme === "dark"
          ? "0 4px 20px rgba(0, 0, 0, 0.3)"
          : "0 4px 20px rgba(0, 0, 0, 0.1)"}
      h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
      font-size: 1.8rem;
      font-weight: 600;
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
          border: 1px solid
            ${({ theme }) => (theme === "dark" ? "#555" : "#ccc")};
          background-color: ${({ theme }) =>
            theme === "dark" ? "#3c3c3c" : "#fff"};
          color: ${({ theme }) => (theme === "dark" ? "#eee" : "#333")};
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: ${({ theme }) =>
              theme === "dark" ? "#888" : "#28a745"};
            box-shadow: ${({ theme }) =>
              theme === "dark"
                ? "0 0 0 3px rgba(136, 136, 136, 0.3)"
                : "0 0 0 3px rgba(40, 167, 69, 0.25)"};
          }

          &::placeholder {
            color: ${({ theme }) => (theme === "dark" ? "#888" : "#999")};
          }
        }
        span {
          color: #dc3545;
          font-size: 0.875rem;
          font-weight: 500;
          min-height: 1.25rem;
        }
        .optional {
          font-size: 0.75rem;
          color: ${({ theme }) => (theme === "dark" ? "#888" : "#666")};
          font-style: italic;
          margin-top: -0.25rem;
        }
      }
      .serverError {
        background-color: ${({ theme }) =>
          theme === "dark" ? "#442222" : "#f8d7da"};
        color: ${({ theme }) => (theme === "dark" ? "#ff6b6b" : "#721c24")};
        padding: 12px;
        border-radius: 6px;
        border: 1px solid
          ${({ theme }) => (theme === "dark" ? "#663333" : "#f5c6cb")};
        font-size: 0.9rem;
        text-align: center;
        margin-top: 0.5rem;
      }
    }
    p {
      text-align: center;
      margin-top: 2rem;
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
