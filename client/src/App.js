import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import SearchForm from './components/SearchForm';
import MemeDisplay from './components/MemeDisplay';
import CloudBackground from './CloudBackground';
import { API_ENDPOINTS } from './config';

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [memeData, setMemeData] = useState(null);
  const [memeLoading, setMemeLoading] = useState(false);
  const [cityFromUrl, setCityFromUrl] = useState(getQueryParam('city') || '');
  const [memeFromUrl, setMemeFromUrl] = useState(getQueryParam('meme') || '');

  useEffect(() => {
    if (cityFromUrl) {
      fetchWeather(cityFromUrl);
    }
    // eslint-disable-next-line
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_ENDPOINTS.WEATHER}/${city}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      setWeatherData(data);
      // После получения погоды — загружаем мем по температуре
      fetchMeme(data.temperature);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // temp — температура (может быть undefined для ручной загрузки)
  const fetchMeme = async (temp) => {
    setMemeLoading(true);
    try {
      let url = `${API_ENDPOINTS.MEMES}/random`;
      if (typeof temp === 'number') {
        url += `?temp=${temp}`;
      }
      if (memeFromUrl) {
        url += (url.includes('?') ? '&' : '?') + `meme=${encodeURIComponent(memeFromUrl)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке мема');
      }
      const data = await response.json();
      setMemeData({
        imageUrl: data.image,
        caption: data.text,
        source: data.source,
        timestamp: data.timestamp
      });
    } catch (err) {
      console.error('Error loading meme:', err.message);
    } finally {
      setMemeLoading(false);
    }
  };

  return (
    <div className="App">
      <CloudBackground />
      <header className="App-header">
        <h1>🌤️ Weather App</h1>
        <p>Узнайте погоду в любом городе</p>
      </header>
      
      <main className="App-main">
        <SearchForm onSearch={fetchWeather} onMemeLoad={() => fetchMeme(weatherData?.temperature)} cityValue={cityFromUrl} />
        
        {loading && (
          <div className="loading">
            <p>Загрузка данных о погоде...</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <p>Ошибка: {error}</p>
          </div>
        )}
        
        {/* Контейнер для блоков погоды и мемов */}
        <div className="content-container">
          {/* Левая секция - погода */}
          <div className="weather-section">
            {weatherData && !loading && (
              <WeatherDisplay weather={weatherData} />
            )}
          </div>
          
          {/* Правая секция - мемы */}
          {weatherData && !loading && (
            <div className="meme-section">
              <MemeDisplay meme={memeData} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2024 Weather App. Создано с React и Node.js</p>
      </footer>
    </div>
  );
}

export default App; 