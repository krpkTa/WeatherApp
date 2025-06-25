const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const MEMES_FILE = path.join(__dirname, '../memes.json');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'supersecretadmintoken';

// Получение случайного мема с учетом температуры
router.get('/random', async (req, res) => {
  try {
    let memesData = { hot: [], cold: [] };
    if (fs.existsSync(MEMES_FILE)) {
      const fileContent = fs.readFileSync(MEMES_FILE, 'utf-8');
      memesData = JSON.parse(fileContent);
    }

    // Если передан temp, выбираем группу
    let group = null;
    if (req.query.temp !== undefined) {
      const temp = parseFloat(req.query.temp);
      group = temp >= 20 ? 'hot' : 'cold';
    }

    let meme = null;
    if (group && memesData[group] && memesData[group].length > 0) {
      const arr = memesData[group];
      meme = arr[Math.floor(Math.random() * arr.length)];
    }

    // Если не найдено по температуре, пробуем любую группу
    if (!meme) {
      const allMemes = [...(memesData.hot || []), ...(memesData.cold || [])];
      if (allMemes.length > 0) {
        meme = allMemes[Math.floor(Math.random() * allMemes.length)];
      }
    }

    // Если мем не найден — возвращаем заглушку
    if (!meme) {
      meme = {
        image: 'https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Мем+здесь',
        text: 'Мемов пока нет, добавьте их через админку!'
      };
    }

    res.json(meme);
  } catch (error) {
    console.error('Error fetching meme:', error.message);
    res.status(500).json({ error: 'Ошибка при получении мема' });
  }
});

// Получение мема по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Здесь в будущем можно получить мем по ID
    const mockMeme = {
      id: parseInt(id),
      imageUrl: `https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Мем+${id}`,
      caption: `Мем номер ${id} - скоро здесь будет что-то смешное! 😄`,
      source: 'Weather App Memes',
      timestamp: new Date().toISOString()
    };
    
    res.json(mockMeme);
  } catch (error) {
    console.error('Error fetching meme by ID:', error.message);
    res.status(500).json({ error: 'Ошибка при получении мема' });
  }
});

// Добавление нового мема через POST /memes
router.post('/', express.json(), (req, res) => {
  // Проверка токена администратора
  const token = req.headers['authorization'] || req.headers['x-admin-token'];
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Только администратор может добавлять мемы' });
  }

  const { weatherType, image, text } = req.body;
  if (!weatherType || !['hot', 'cold'].includes(weatherType)) {
    return res.status(400).json({ error: 'weatherType должен быть "hot" или "cold"' });
  }
  if (!image || !text) {
    return res.status(400).json({ error: 'Необходимо указать image и text' });
  }

  // Читаем текущий JSON с мемами
  let memesData = { hot: [], cold: [] };
  if (fs.existsSync(MEMES_FILE)) {
    try {
      const fileContent = fs.readFileSync(MEMES_FILE, 'utf-8');
      memesData = JSON.parse(fileContent);
    } catch (e) {
      return res.status(500).json({ error: 'Ошибка чтения файла мемов' });
    }
  }

  // Добавляем новый мем
  memesData[weatherType].push({ image, text });

  // Сохраняем обратно
  try {
    fs.writeFileSync(MEMES_FILE, JSON.stringify(memesData, null, 2), 'utf-8');
    res.status(201).json({ success: true, meme: { image, text }, weatherType });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сохранения файла мемов' });
  }
});

module.exports = router; 