import { useState, useCallback } from "react";

interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface UsePasswordValidationReturn {
  errors: PasswordErrors;
  validatePasswordForm: (passwordData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => boolean;
  clearError: (field: keyof PasswordErrors) => void;
  clearAllErrors: () => void;
  setFieldError: (field: keyof PasswordErrors, message: string) => void;
}

export const usePasswordValidation = (): UsePasswordValidationReturn => {
  const [errors, setErrors] = useState<PasswordErrors>({});

  const validatePasswordForm = useCallback(
    (passwordData: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    }): boolean => {
      const newErrors: PasswordErrors = {};
      if (!passwordData.oldPassword.trim()) {
        newErrors.oldPassword = "Текущий пароль обязателен";
      }

      if (!passwordData.newPassword.trim()) {
        newErrors.newPassword = "Новый пароль обязателен";
      } else if (passwordData.newPassword.length < 6) {
        newErrors.newPassword = "Пароль должен содержать минимум 6 символов";
      } else if (passwordData.newPassword === passwordData.oldPassword) {
        newErrors.newPassword = "Новый пароль должен отличаться от текущего";
      }
      if (!passwordData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Подтверждение пароля обязательно";
      } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    []
  );

  const clearError = useCallback((field: keyof PasswordErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback(
    (field: keyof PasswordErrors, message: string) => {
      setErrors((prev) => ({ ...prev, [field]: message }));
    },
    []
  );

  return {
    errors,
    validatePasswordForm,
    clearError,
    clearAllErrors,
    setFieldError,
  };
};
