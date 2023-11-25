import { useState } from 'react';
import Gallery from './Gallery';
import logoAlt from '../assets/logo.png'

import './Popup.css'

export const Popup = () => {
  const [genre, setGenre] = useState('');
  const [memes, setMemes] = useState([]);

  const createGallery = () => {
    // Create a gallery of images based on the selected genre and conversation context
  };

  return (
    <main className="centered">
      <div className="header">
        <img width="12%" src={logoAlt} />
        <h1>ChatMe–meT</h1>
      </div>
      <label>Add the perfect meme response to your clipboard</label>
      <select onChange={e => {
        setGenre(e.target.value);
        createGallery;
      }}>
        <option className="disabled">Select a meme genre</option>
        <option value="Facebook Mom">Facebook Mom</option>
        <option value="Dank">Dank</option>
        <option value="Surrealist">Surrealist</option>
        <option value="Wholesome">Wholesome</option>
        <option value="Redditor">Redditor</option>
      </select>
      {genre !== "" && <Gallery images={memes} />}
    </main>
  )
}

export default Popup
