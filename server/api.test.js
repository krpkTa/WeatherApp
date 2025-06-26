const request = require('supertest');
const express = require('express');
const app = require('./index'); // Экспортируйте express app из index.js

describe('Weather API', () => {
  it('должен возвращать погоду для города', async () => {
    const res = await request(app).get('/api/weather/Минск');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('city', 'Минск');
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('icon');
  });
});

describe('Memes API', () => {
  it('должен возвращать случайный мем', async () => {
    const res = await request(app).get('/api/memes/random');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('image');
    expect(res.body).toHaveProperty('text');
  });
});

describe('POST /api/memes', () => {
  const adminToken = 'secrettoken';
  const memeData = {
    weatherType: 'hot',
    image: 'https://example.com/meme.jpg',
    text: 'Жарко, как в аду!'
  };

  it('успешно добавляет мем с валидным токеном', async () => {
    const res = await request(app)
      .post('/api/memes')
      .set('Authorization', adminToken)
      .send(memeData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('meme');
    expect(res.body.meme).toMatchObject({ image: memeData.image, text: memeData.text });
    expect(res.body).toHaveProperty('weatherType', memeData.weatherType);
  });

  it('возвращает 401 без токена', async () => {
    const res = await request(app)
      .post('/api/memes')
      .send(memeData);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('возвращает 400 при некорректных данных', async () => {
    const res = await request(app)
      .post('/api/memes')
      .set('Authorization', adminToken)
      .send({ weatherType: 'wrong', image: '', text: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
}); 