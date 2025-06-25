import React, { useState, useEffect } from 'react';
import './MemeDisplay.css';

function MemeDisplay({ meme }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const fadeTimer = setTimeout(() => setFadeIn(true), 10);
    return () => clearTimeout(fadeTimer);
  }, [meme?.imageUrl, meme?.caption, meme?.image, meme?.text]);

  // Если мем не загружен, показываем заглушку
  if (!meme) {
    return (
      <div className="meme-display">
        <div className="meme-card placeholder">
          <div className="meme-image-placeholder">
            <span className="placeholder-icon">🎭</span>
            <p>Мемы появятся здесь</p>
          </div>
          <div className="meme-caption-placeholder">
            <p>Подпись к мему</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="meme-display">
      <div className={`meme-card${fadeIn ? ' meme-fade-in' : ''}`}>
        <div className="meme-image-container">
          <img 
            src={meme.imageUrl || meme.image} 
            alt={meme.caption || meme.text || "Мем"}
            className="meme-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="meme-image-error" style={{ display: 'none' }}>
            <span className="error-icon">😅</span>
            <p>Изображение не загрузилось</p>
          </div>
        </div>
        
        <div className="meme-caption">
          <p>{meme.caption || meme.text || "Без подписи"}</p>
        </div>
        
        {meme.source && (
          <div className="meme-source">
            <small>Источник: {meme.source}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemeDisplay; 