# 🚀 Руководство по деплою Weather App

## 📋 Подготовка

### 1. Получение API ключа OpenWeatherMap

1. Зайдите на [OpenWeatherMap](https://openweathermap.org/api)
2. Зарегистрируйтесь и получите бесплатный API ключ
3. Сохраните ключ - он понадобится для настройки бэкенда

### 2. Подготовка репозиториев

#### Для бэкенда:
1. Создайте новый репозиторий на GitHub (например: `weather-app-backend`)
2. Скопируйте все файлы из папки `server/` в новый репозиторий
3. Убедитесь, что у вас есть:
   - `package.json`
   - `index.js`
   - `routes/` (папка)
   - `memes.json`
   - `env.example`

#### Для фронтенда:
1. Используйте текущий репозиторий или создайте новый
2. Убедитесь, что у вас есть:
   - `client/` (папка с React приложением)
   - `vercel.json`
   - `README.md`

---

## 🔧 Деплой бэкенда на Render

### Шаг 1: Создание Web Service

1. Зайдите на [render.com](https://render.com)
2. Нажмите "New +" → "Web Service"
3. Подключите репозиторий с бэкендом

### Шаг 2: Настройка параметров

```
Name: weather-app-backend
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### Шаг 3: Переменные окружения

В разделе "Environment Variables" добавьте:

```
OPENWEATHER_API_KEY=ваш_ключ_openweather
ADMIN_TOKEN=ваш_секретный_токен
NODE_ENV=production
```

### Шаг 4: Деплой

1. Нажмите "Create Web Service"
2. Дождитесь завершения деплоя
3. Скопируйте URL (например: `https://weather-app-backend.onrender.com`)

---

## ⚡ Деплой фронтенда на Vercel

### Шаг 1: Подготовка

1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите репозиторий с фронтендом

### Шаг 2: Настройка переменных окружения

В настройках проекта добавьте:

```
REACT_APP_API_URL=https://ваш-backend-url.onrender.com
```

### Шаг 3: Деплой

1. Vercel автоматически определит, что это React приложение
2. Файл `vercel.json` настроит правильную сборку
3. Приложение будет доступно по URL вида: `https://your-app.vercel.app`

---

## 🧪 Тестирование

### Проверка бэкенда

```bash
# Проверка здоровья сервера
curl https://your-backend-url.onrender.com/api/health

# Проверка погоды
curl https://your-backend-url.onrender.com/api/weather/Moscow
```

### Проверка фронтенда

1. Откройте URL вашего фронтенда
2. Попробуйте найти погоду для любого города
3. Проверьте, что мемы загружаются

---

## 🔄 Обновления

### Автоматические деплои

- **Vercel**: Автоматически деплоит при каждом push в main ветку
- **Render**: Автоматически деплоит при каждом push в main ветку

### Ручные обновления

Если нужно обновить вручную:
- **Vercel**: В дашборде нажмите "Redeploy"
- **Render**: В дашборде нажмите "Manual Deploy"

---

## 🛠️ Устранение неполадок

### Бэкенд не отвечает

1. Проверьте логи в Render Dashboard
2. Убедитесь, что все переменные окружения установлены
3. Проверьте, что API ключ OpenWeatherMap действителен

### Фронтенд не подключается к бэкенду

1. Проверьте переменную `REACT_APP_API_URL` в Vercel
2. Убедитесь, что URL бэкенда правильный и доступен
3. Проверьте CORS настройки

### Ошибки сборки

1. Проверьте, что все зависимости указаны в `package.json`
2. Убедитесь, что Node.js версия совместима (>=16.0.0)
3. Проверьте логи сборки в дашбордах

---

## 📞 Поддержка

- **Render**: [docs.render.com](https://docs.render.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **OpenWeatherMap**: [openweathermap.org/api](https://openweathermap.org/api) 