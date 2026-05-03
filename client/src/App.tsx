import { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import type { User } from "./models/User";
import { fetchUsers } from "./services/UserService";
import s from "./App.module.css";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  async function getUsers() {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return (
      <div className={s.page}>
        <div className={s.card}>
          <h1 className={s.title}>Загрузка...</h1>
          <p className={s.subtitle}>Проверяем сессию и авторизацию.</p>
        </div>
      </div>
    );
  }

  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <div className={s.page}>
      <div className={s.card}>
        <h1 className={s.title}>
          {store.isAuth
            ? `Пользователь авторизован: ${store.user.email}`
            : "Вы не авторизованы в системе :("}
        </h1>
        <p className={`${s.status} ${store.user.isActivated ? s.statusSuccess : s.statusWarning}`}>
          {store.user.isActivated
            ? "Аккаунт подтвержден по почте"
            : "Подтверди аккаунт по почте, чтобы открыть полный доступ"}
        </p>

        <div className={s.actions}>
          <button className={s.button} onClick={() => store.logoutAction()}>
            Выйти
          </button>
          <button className={s.button} onClick={getUsers}>
            Получить пользователей
          </button>
        </div>

        <div className={s.usersBlock}>
          <h2 className={s.usersTitle}>Пользователи</h2>
          {users.length === 0 ? (
            <p className={s.emptyUsers}>Список пуст. Нажми кнопку, чтобы загрузить данные.</p>
          ) : (
            <ul className={s.usersList}>
              {users.map((user) => {
                return <li className={s.userItem} key={user.email}>{user.email}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(App);
