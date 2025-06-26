import React, { useState, useEffect } from 'react';
import './MemeDisplay.css';

function MemeDisplay({ meme }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, [meme?.imageUrl, meme?.caption, meme?.image, meme?.text]);

  // Если мем не загружен, ничего не рендерим
  if (!meme) {
    return null;
  }

  return (
    <div className="meme-display">
      <div className={`meme-card${fadeIn ? ' meme-fade-in' : ''}`}>
        <div className="meme-image-container">
          <img 
            src={meme.imageUrl} 
            alt={meme.caption || "Мем"}
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
          <p>{meme.caption || "Без подписи"}</p>
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