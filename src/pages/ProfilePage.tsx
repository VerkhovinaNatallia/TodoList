import React, { useState, useEffect, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import {
  clearError as clearAuthError,
  fetchUserProfile,
} from "../store/auth/authSlice";
import type { RootState } from "../types/types";
import styled from "styled-components";
import { useTheme } from "../context/ThemeHooks/useTheme";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import PasswordChangeForm from "../components/Profile/PasswordChangeForm";

interface ThemeProps {
  theme: "light" | "dark";
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    status,
    error: authError,
  } = useSelector((state: RootState) => state.auth);
  const { theme } = useTheme();

  const { errors, validatePasswordForm, clearError, clearAllErrors } =
    usePasswordValidation();
  const errorsRecord: Record<string, string> = {};
  if (errors.oldPassword) errorsRecord.oldPassword = errors.oldPassword;
  if (errors.newPassword) errorsRecord.newPassword = errors.newPassword;
  if (errors.confirmPassword)
    errorsRecord.confirmPassword = errors.confirmPassword;

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearAuthError());
    clearAllErrors();
  }, [dispatch, clearAllErrors]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isValid = validatePasswordForm(passwordData);

    if (isValid) {
      try {
        setMessage("Пароль успешно изменен");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        clearAllErrors();
        setIsSubmitted(false);
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error("Ошибка при изменении пароля:", error);
        setIsSubmitted(false);
      }
    } else {
      setIsSubmitted(false);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ChangePasswordData;

    setPasswordData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      clearError(fieldName);
    }

    if (message) setMessage("");
    if (authError) {
      dispatch(clearAuthError());
    }

    if (isSubmitted) {
      validatePasswordForm({ ...passwordData, [fieldName]: value });
    }
  };

  if (!user) {
    return <LoadingText theme={theme}>Загрузка...</LoadingText>;
  }

  return (
    <Container theme={theme}>
      <h1>Профиль</h1>

      <div>
        <h2>Информация пользователя</h2>
        <div className="conteinerInfo">
          <div>
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>
          <div>
            <strong>Возраст</strong>
            <span>{user.age || "Не указан"}</span>
          </div>
          <div>
            <strong>Дата регистрации</strong>
            <span>{new Date(user.createdAt).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>
      </div>

      <div>
        <h2>Смена пароля</h2>
        <PasswordChangeForm
          theme={theme}
          passwordData={passwordData}
          errors={errorsRecord}
          status={status}
          message={message}
          authError={authError}
          onSubmit={handlePasswordSubmit}
          onChange={handlePasswordChange}
        />
      </div>
    </Container>
  );
};

export default ProfilePage;

const Container = styled.div<ThemeProps>`
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

const LoadingText = styled.div<ThemeProps>`
  text-align: center;
  color: ${({ theme }) => (theme === "dark" ? "#cccccc" : "#666666")};
  font-size: 1.2rem;
  padding: 2rem;
`;
