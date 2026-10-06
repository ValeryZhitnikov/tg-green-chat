# tg-green-chat

Веб-чат для обмена текстовыми сообщениями в Telegram через сервис [GREEN-API](https://green-api.com/telegram).

## Стек

- **React 19** — UI
- **TypeScript** — типизация
- **Vite** — сборка и дев-сервер
- **Tailwind CSS 4** — стилизация

## Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/ValeryZhitnikov/tg-green-chat.git
cd tg-green-chat
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить переменные окружения

Создайте файл `.env` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env
```

Укажите базовый URL API GREEN-API:

```
VITE_GREEN_API_URL=https://api.green-api.com
```

### 4. Запустить дев-сервер

```bash
npm run dev
```

Приложение откроется по адресу `http://localhost:5173`.

### 5. Сборка для продакшена

```bash
npm run build
```

Собранные файлы окажутся в папке `dist/`.

## Как пользоваться

1. Откройте приложение и введите `idInstance` и `apiTokenInstance` из личного кабинета GREEN-API.
2. Укажите номер телефона получателя в международном формате без `+` (например, `79991234567`).
3. Напишите сообщение и отправьте его — оно уйдёт в Telegram.
4. Ответы собеседника появятся в чате автоматически.

## Структура проекта

```
src/
├── api/              # HTTP-запросы к GREEN-API
│   ├── greenApi.ts
│   └── types.ts
├── services/         # Бизнес-логика (парсинг, нормализация, настройка инстанса)
│   └── chatService.ts
├── hooks/            # React-хуки (авторизация, чат с polling)
│   ├── useAuth.ts
│   └── useChat.ts
├── context/          # Общий контекст (credentials, phone)
│   └── AppContext.tsx
├── components/       # Компоненты
│   ├── ui/           # Базовые UI-элементы
│   ├── ChatHeader.tsx
│   ├── MessageInput.tsx
│   └── MessageList.tsx
├── screens/          # Экраны (вход, создание чата, чат)
├── App.tsx
└── main.tsx
```

## Известные ограничения

- История сообщений не сохраняется — при перезагрузке страницы чат пуст.
- Сообщения, отправленные с телефона (не из приложения), в интерфейсе не отображаются.
- Поддерживаются только текстовые сообщения.