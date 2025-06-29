# 🌤️ Weather App Backend

Бэкенд для приложения погоды, созданный на Node.js и Express.

## 🚀 Деплой на Render

### 1. Подготовка

1. Создайте новый репозиторий на GitHub
2. Скопируйте все файлы из папки `server/` в новый репозиторий
3. Убедитесь, что у вас есть файлы:
   - `package.json`
   - `index.js`
   - `routes/` (папка с маршрутами)
   - `memes.json`
   - `env.example`

### 2. Деплой на Render

1. Зайдите на [render.com](https://render.com)
2. Нажмите "New +" → "Web Service"
3. Подключите ваш GitHub репозиторий
4. Настройте параметры:
   - **Name:** `weather-app-backend` (или любое другое)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### 3. Переменные окружения

В разделе "Environment Variables" добавьте:

```
OPENWEATHER_API_KEY=your_openweather_api_key_here
ADMIN_TOKEN=your_secret_admin_token_here
NODE_ENV=production
```

### 4. Получение API ключа OpenWeatherMap

1. Зарегистрируйтесь на [OpenWeatherMap](https://openweathermap.org/api)
2. Получите бесплатный API ключ
3. Добавьте его в переменные окружения на Render

### 5. Запуск

После настройки Render автоматически:
1. Установит зависимости
2. Запустит сервер
3. Даст вам URL вида: `https://your-app-name.onrender.com`

## 🔧 API Endpoints

- `GET /api/health` - проверка состояния сервера
- `GET /api/weather/:city` - получение погоды по городу
- `GET /api/memes/random` - получение случайного мема
- `POST /api/memes` - добавление нового мема (требует ADMIN_TOKEN)

## 🛠️ Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Запуск в продакшене
npm start
```

## 📝 Примечания

- Сервер автоматически использует порт из переменной окружения `PORT`
- В продакшене Render автоматически устанавливает порт
- API ключ OpenWeatherMap обязателен для работы с реальными данными
- Мемы сохраняются в файле `memes.json` 