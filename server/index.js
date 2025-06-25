const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'your_api_key_here';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Проверяем наличие API ключа
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_api_key_here') {
      return res.status(500).json({ 
        error: 'API ключ OpenWeatherMap не настроен. Добавьте OPENWEATHER_API_KEY в .env файл' 
      });
    }
    
    // Запрос к OpenWeatherMap API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ru`
    );
    
    const weatherData = response.data;
    
    // Извлекаем только нужные данные
    const processedData = {
      city: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed),
      timestamp: new Date().toISOString()
    };
    
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    if (error.response) {
      // Ошибка от API
      if (error.response.status === 404) {
        res.status(404).json({ error: 'Город не найден' });
      } else if (error.response.status === 401) {
        res.status(401).json({ error: 'Неверный API ключ' });
      } else {
        res.status(error.response.status).json({ 
          error: 'Ошибка при получении данных о погоде' 
        });
      }
    } else {
      // Сетевая ошибка
      res.status(500).json({ error: 'Ошибка сети при получении данных о погоде' });
    }
  }
});

// Meme routes
const memesRouter = require('./routes/memes');
app.use('/api/memes', memesRouter);

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_api_key_here') {
    console.warn('⚠️  ВНИМАНИЕ: API ключ OpenWeatherMap не настроен!');
    console.warn('   Добавьте OPENWEATHER_API_KEY в .env файл для работы с реальными данными.');
  }
}); 