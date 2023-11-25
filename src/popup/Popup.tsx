import { useState, useEffect } from 'react'
import logoAlt from '../assets/logo.png'
import testImg from '../assets/test.png'

import './Popup.css'

export const Popup = () => {

  const handleCopy = () => {
    // Copy image to clipboard
  };

  return (
    <main className="centered">
      <div className="header">
        <img width="12%" src={logoAlt}/>
        <h1>ChatMe–mseT</h1>
      </div>
      <label>Add the perfect meme response to your clipboard</label>
      <div className="gallery">
        <img src={testImg} onClick={handleCopy} />
        <img src={testImg} onClick={handleCopy} />
      </div>
    </main>
  );
}

export default Popup
