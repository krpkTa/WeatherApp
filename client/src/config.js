// Конфигурация API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  WEATHER: `${API_BASE_URL}/api/weather`,
  MEMES: `${API_BASE_URL}/api/memes`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL; 