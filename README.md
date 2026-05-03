# JWT Auth

Full-stack приложение для регистрации, авторизации и обновления JWT-токенов. Проект состоит из React-клиента и Express-сервера с хранением пользователей и refresh-токенов в MongoDB.

## Возможности

- Регистрация и вход по email/password
- Хеширование паролей через `bcrypt`
- Access token в `localStorage`
- Refresh token в `httpOnly` cookie
- Автоматическое обновление access token через Axios interceptor
- Подтверждение аккаунта по email
- Защищенный маршрут для получения списка пользователей
- Управление auth-состоянием на клиенте через MobX

## Стек

**Client**

- React 19
- TypeScript
- Vite
- MobX
- Axios
- CSS Modules

**Server**

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt
- cookie-parser
- nodemailer
- express-validator

## Структура проекта

```text
jwt-auth/
├── client/              # React + Vite приложение
│   └── src/
│       ├── components/  # UI-компоненты формы авторизации
│       ├── hooks/       # Логика auth-формы
│       ├── http/        # Axios instance и refresh interceptor
│       ├── models/      # TypeScript-типы
│       ├── services/    # API-запросы
│       └── store/       # MobX store
└── server/              # Express API
    ├── controllers/     # HTTP-контроллеры
    ├── dtos/            # DTO пользователя
    ├── exceptions/      # API-ошибки
    ├── middlewares/     # Auth и error middleware
    ├── models/          # Mongoose-модели
    ├── router/          # API-маршруты
    └── service/         # Бизнес-логика
```

## Требования

- Node.js 20+
- npm
- MongoDB локально или MongoDB Atlas
- SMTP-аккаунт для отправки писем активации

## Переменные окружения

Создайте файл `server/.env` на основе `server/.env.example`:

```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/jwt-auth
JWT_ACCESS_SECRET=change-me-access-secret
JWT_REFRESH_SECRET=change-me-refresh-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-address@gmail.com
SMTP_PASSWORD=your-app-password
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173/
```

Для Gmail используйте app password, а не основной пароль аккаунта.

## Установка

Установите зависимости отдельно для клиента и сервера:

```bash
cd server
npm install

cd ../client
npm install
```

## Запуск в режиме разработки

Запустите сервер:

```bash
cd server
npm run dev
```

По умолчанию API будет доступно на `http://localhost:5000/api`.

Запустите клиент в отдельном терминале:

```bash
cd client
npm run dev
```

Клиент будет доступен на `http://localhost:5173`.

## Скрипты

### Client

```bash
npm run dev      # запуск Vite dev server
npm run build    # production build
npm run lint     # проверка ESLint
npm run preview  # preview production build
```

### Server

```bash
npm run dev      # запуск сервера через nodemon
```

## API

Базовый URL: `http://localhost:5000/api`

| Method | Endpoint | Описание | Auth |
| --- | --- | --- | --- |
| `POST` | `/registration` | Регистрация пользователя и отправка письма активации | Нет |
| `POST` | `/login` | Авторизация пользователя | Нет |
| `POST` | `/logout` | Выход и удаление refresh token | Нет |
| `GET` | `/activate/:link` | Активация аккаунта по email-ссылке | Нет |
| `GET` | `/refresh` | Обновление пары токенов | Cookie |
| `GET` | `/users` | Получение списка пользователей | Bearer token |

## Как работает авторизация

1. Пользователь регистрируется или входит в аккаунт.
2. Сервер возвращает `accessToken` и сохраняет `refreshToken` в `httpOnly` cookie.
3. Клиент сохраняет `accessToken` в `localStorage` и добавляет его в заголовок `Authorization`.
4. При `401` Axios interceptor вызывает `/refresh`, получает новый access token и повторяет исходный запрос.
5. Защищенные маршруты проверяют access token через middleware на сервере.

## Сборка клиента

```bash
cd client
npm run build
```

Готовая сборка появится в `client/dist`.

## Примечания

- Клиент берёт API URL из `client/.env` через переменную `VITE_API_URL` (с fallback на `http://localhost:5000/api`).
- В `server/.env` значение `CLIENT_URL` должно совпадать с адресом Vite dev server, иначе CORS и cookie могут работать некорректно.
- Для production окружения используйте длинные уникальные JWT secrets и настройте `secure`, `sameSite` и домен cookie под ваш deployment.
