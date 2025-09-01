import { type ChangeEvent, type FC, type FormEvent } from "react";
import { SubmitButton, Container } from './PasswordChangeForm.styles'

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

interface PasswordChangeFormProps {
  theme: "light" | "dark";
  passwordData: ChangePasswordData;
  errors: PasswordErrors;
  status: string;
  message: string;
  authError?: string | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordChangeForm: FC<PasswordChangeFormProps> = ({
  theme,
  passwordData,
  errors,
  status,
  message,
  authError,
  onSubmit,
  onChange,
}) => {
  return (
    <Container onSubmit={onSubmit} theme={theme}>
      <div>
        <input
          type="password"
          name="oldPassword"
          placeholder="Текущий пароль"
          value={passwordData.oldPassword}
          onChange={onChange}
          autoComplete="current-password"
        />
        {errors.oldPassword && <span>{errors.oldPassword}</span>}
      </div>

      <div>
        <input
          type="password"
          name="newPassword"
          placeholder="Новый пароль"
          value={passwordData.newPassword}
          onChange={onChange}
          autoComplete="new-password"
        />
        {errors.newPassword && <span>{errors.newPassword}</span>}
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите новый пароль"
          value={passwordData.confirmPassword}
          onChange={onChange}
          autoComplete="new-password"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      {message && <div className="successMessage">{message}</div>}
      {authError && <div className="errorMessage">{authError}</div>}

      <SubmitButton type="submit" disabled={status === "loading"} theme={theme}>
        {status === "loading" ? "Изменение..." : "Изменить пароль"}
      </SubmitButton>
    </Container>
  );
};



