import React, { useState, useEffect } from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weather }) {
  const [isShaking, setIsShaking] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  useEffect(() => {
    setFadeIn(true);
  }, [weather.city, weather.temperature, weather.description, weather.icon]);

  useEffect(() => {
    const temp = weather.temperature;
    if (temp <= -20 || temp >= 30) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [weather.temperature]);

  return (
    <div className="weather-display">
      <div className={`weather-card${fadeIn ? ' weather-fade-in' : ''}`}>
        <div className="weather-header">
          <h2>{weather.city}</h2>
          <div className="weather-icon">
            <img 
              src={getWeatherIconUrl(weather.icon)} 
              alt={weather.description}
              className="weather-icon-img"
            />
          </div>
        </div>
        <div className="weather-main">
          <div className="temperature">
            <span className="temp-value">
              {weather.temperature}°C 
              <span 
                className={`thermometer-icon ${isShaking ? 'shake' : ''}`} 
                role="img" 
                aria-label="thermometer"
              >
                🌡️
              </span>
            </span>
          </div>
          <div className="description">
            <p>{weather.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay; 