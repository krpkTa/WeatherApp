# 🌤️ Weather App

Веб-приложение для просмотра погоды с мемами, созданное на React и Node.js.

## 🚀 Деплой

### Бэкенд (Render)

1. **Подготовка репозитория:**
   - Создайте отдельный репозиторий для бэкенда
   - Скопируйте папку `server/` в новый репозиторий
   - Добавьте файлы: `server/package.json`, `server/env.example`

2. **Деплой на Render:**
   - Зайдите на [render.com](https://render.com)
   - Создайте новый Web Service
   - Подключите ваш GitHub репозиторий
   - Настройки:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment Variables:**
       - `OPENWEATHER_API_KEY` - ваш API ключ OpenWeatherMap
       - `ADMIN_TOKEN` - секретный токен для админских операций
       - `NODE_ENV` - `production`

3. **Получение URL бэкенда:**
   - После деплоя Render даст вам URL вида: `https://your-app-name.onrender.com`
   - Сохраните этот URL для настройки фронтенда

### Фронтенд (Vercel)

1. **Подготовка:**
   - Убедитесь, что в `client/src/config.js` используется переменная окружения
   - Создайте файл `vercel.json` в корне проекта

2. **Деплой на Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Подключите ваш GitHub репозиторий
   - В настройках проекта добавьте Environment Variable:
     - `REACT_APP_API_URL` - URL вашего бэкенда на Render

3. **Автоматический деплой:**
   - Vercel автоматически деплоит при каждом push в main ветку
   - Файл `vercel.json` настроит правильную сборку React приложения

## 🛠️ Локальная разработка

### Установка зависимостей
```bash
# Установка всех зависимостей
npm run install-all
```

### Запуск в режиме разработки
```bash
# Запуск сервера и клиента одновременно
npm run dev
```

### Отдельный запуск
```bash
# Только сервер
npm run server

# Только клиент
npm run client
```

## 📁 Структура проекта

```
WeatherApp/
├── client/                 # React фронтенд
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── config.js       # Конфигурация API
│   │   └── App.js          # Главный компонент
│   └── package.json
├── server/                 # Node.js бэкенд
│   ├── routes/             # API маршруты
│   ├── index.js            # Главный серверный файл
│   └── package.json
├── vercel.json             # Конфигурация Vercel
└── README.md
```

## 🔧 API Endpoints

- `GET /api/weather/:city` - получение погоды по городу
- `GET /api/memes/random` - получение случайного мема
- `POST /api/memes` - добавление нового мема (требует ADMIN_TOKEN)

## 🌍 Переменные окружения

### Бэкенд (.env)
```
PORT=5000
NODE_ENV=production
OPENWEATHER_API_KEY=your_api_key_here
ADMIN_TOKEN=your_admin_token_here
```

### Фронтенд (.env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 📝 Примечания

- Для работы с реальными данными погоды нужен API ключ OpenWeatherMap
- Мемы сохраняются в JSON файле на сервере
- Приложение поддерживает кэширование погодных данных
- Фронтенд автоматически адаптируется к URL бэкенда через переменные окружения 