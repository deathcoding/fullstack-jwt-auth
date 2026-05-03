import type { ChangeEvent } from "react";
import s from "./LoginForm.module.css";

interface PasswordInputProps {
  value: string;
  isVisible: boolean;
  autoComplete: "current-password" | "new-password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
}

function PasswordInput({
  value,
  isVisible,
  autoComplete,
  onChange,
  onToggleVisibility,
}: PasswordInputProps) {
  return (
    <div className={s.passwordRow}>
      <input
        id="password"
        className={s.input}
        onChange={onChange}
        value={value}
        type={isVisible ? "text" : "password"}
        placeholder="Не менее 5 символов"
        autoComplete={autoComplete}
        minLength={5}
        required
      />
      <button
        className={`${s.button} ${s.secondaryButton}`}
        type="button"
        onClick={onToggleVisibility}
      >
        {isVisible ? "Скрыть" : "Показать"}
      </button>
    </div>
  );
}

export default PasswordInput;
