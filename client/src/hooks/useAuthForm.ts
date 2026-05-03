import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { Context } from "../main";

export type AuthMode = "login" | "register";

export function useAuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { store } = useContext(Context);
  const isLoginMode = mode === "login";

  function setModeWithReset(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage("");
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  function validateFields() {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Заполни email и пароль.");
      return false;
    }

    if (password.length < 5) {
      setErrorMessage("Пароль должен быть не короче 6 символов.");
      return false;
    }

    return true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!validateFields()) {
      return;
    }

    try {
      setIsSubmitting(true);

      if (isLoginMode) {
        await store.loginAction(email, password);
        return;
      }

      await store.registrationAction(email, password);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
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
  };
}
