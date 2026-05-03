import type { AuthMode } from "../hooks/useAuthForm";
import s from "./LoginForm.module.css";

interface AuthModeSwitchProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

function AuthModeSwitch({ mode, onModeChange }: AuthModeSwitchProps) {
  const isLoginMode = mode === "login";

  return (
    <div className={s.modeSwitch} role="tablist" aria-label="Режим формы авторизации">
      <button
        type="button"
        role="tab"
        aria-selected={isLoginMode}
        className={`${s.modeButton} ${isLoginMode ? s.modeButtonActive : ""}`}
        onClick={() => onModeChange("login")}
      >
        Войти
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={!isLoginMode}
        className={`${s.modeButton} ${!isLoginMode ? s.modeButtonActive : ""}`}
        onClick={() => onModeChange("register")}
      >
        Регистрация
      </button>
    </div>
  );
}

export default AuthModeSwitch;
