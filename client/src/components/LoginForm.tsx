import { observer } from "mobx-react-lite";
import s from "./LoginForm.module.css";
import AuthModeSwitch from "./AuthModeSwitch";
import AuthFields from "./AuthFields";
import { useAuthForm } from "../hooks/useAuthForm";

function LoginForm() {
  const {
    mode,
    email,
    password,
    isPasswordVisible,
    isSubmitting,
    errorMessage,
    isLoginMode,
    setModeWithReset,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useAuthForm();

  return (
    <div className={s.page}>
      <div className={s.card}>
        <AuthModeSwitch mode={mode} onModeChange={setModeWithReset} />

        <h1 className={s.title}>{isLoginMode ? "С возвращением" : "Создай аккаунт"}</h1>
        <p className={s.subtitle}>
          {isLoginMode
            ? "Войди, чтобы продолжить работу."
            : "Зарегистрируйся, затем подтверди email и получи доступ."}
        </p>

        <form className={s.form} onSubmit={handleSubmit}>
          <AuthFields
            email={email}
            password={password}
            isPasswordVisible={isPasswordVisible}
            isLoginMode={isLoginMode}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onTogglePasswordVisibility={togglePasswordVisibility}
          />

          {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}

          <button className={s.button} type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isLoginMode
                ? "Входим..."
                : "Регистрируем..."
              : isLoginMode
                ? "Войти"
                : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </div>
  )
}


export default observer(LoginForm);