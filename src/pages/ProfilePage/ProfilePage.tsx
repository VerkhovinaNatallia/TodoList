import React, { useState, useEffect, type ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import {
  clearError as clearAuthError,
  fetchUserProfile,
} from "@/store/auth/authSlice";
import type { RootState } from "@/types/types";
import { useTheme } from "@/context/ThemeHooks/useTheme";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import {PasswordChangeForm} from "@/components";
import {LoadingText, Container} from './ProfilePage.styles'

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ProfilePage: FC = () => {
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


