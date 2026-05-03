import type { ChangeEvent } from "react";
import PasswordInput from "./PasswordInput";
import s from "./LoginForm.module.css";

interface AuthFieldsProps {
  email: string;
  password: string;
  isPasswordVisible: boolean;
  isLoginMode: boolean;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordVisibility: () => void;
}

function AuthFields({
  email,
  password,
  isPasswordVisible,
  isLoginMode,
  onEmailChange,
  onPasswordChange,
  onTogglePasswordVisibility,
}: AuthFieldsProps) {
  return (
    <>
      <label className={s.fieldLabel} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className={s.input}
        onChange={onEmailChange}
        value={email}
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <label className={s.fieldLabel} htmlFor="password">
        Пароль
      </label>
      <PasswordInput
        value={password}
        isVisible={isPasswordVisible}
        autoComplete={isLoginMode ? "current-password" : "new-password"}
        onChange={onPasswordChange}
        onToggleVisibility={onTogglePasswordVisibility}
      />
    </>
  );
}

export default AuthFields;
