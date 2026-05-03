import { useContext, useState } from "react"
import { Context } from "../main";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  return (
    <div>
      <input 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text" 
        placeholder="Email" 
      />
       <input 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password" 
        placeholder="Password" 
      />
      <button onClick={() => store.loginAction(email, password)}>Логин</button>
      <button onClick={() => store.registrationAction(email, password)}>Регистрация</button>
    </div>
  )
}
