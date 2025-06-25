import React, { useState } from 'react';
import './SearchForm.css';

function encodeMemeParam(meme) {
  if (!meme || !meme.imageUrl || !meme.caption) return '';
  return btoa(encodeURIComponent(meme.imageUrl + '||' + meme.caption));
}

function SearchForm({ onSearch, onMemeLoad, cityValue, currentMeme }) {
  const [city, setCity] = useState(cityValue || '');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleShare = () => {
    if (!city.trim()) return;
    const url = `${window.location.origin}?city=${encodeURIComponent(city.trim())}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите название города..."
            className="city-input"
            required
          />
          <button type="submit" className="search-button">
            🔍 Поиск
          </button>
        </div>
      </form>
      <div className="share-section">
        <button
          type="button"
          className="share-button"
          onClick={handleShare}
          disabled={!city.trim()}
        >
          📋 Поделиться
        </button>
        {copied && <span className="share-copied">Ссылка скопирована!</span>}
      </div>
    </div>
  );
}

export default SearchForm; 