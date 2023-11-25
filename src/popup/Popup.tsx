import { useState, useEffect } from 'react'
import logoAlt from '../assets/logo.png'
import testImg from '../assets/test.png'

import './Popup.css'

async function copyToClipboard(pngBlob: Blob) {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [pngBlob.type]: pngBlob,
      }),
    ])
    console.log('Image copied')
  } catch (error) {
    console.error(error)
  }
}

export const Popup = () => {
  const [pngBlob, setPngBlob] = useState<Blob>()

  useEffect(() => {
    fetch(testImg)
      .then((res) => res.blob())
      .then((blob) => setPngBlob(blob))
  }, [])

  const handleCopy = () => {
    if (pngBlob) {
      copyToClipboard(pngBlob)
    }
  }

  return (
    <main className="centered">
      <div className="header">
        <img width="12%" src={logoAlt} />
        <h1>ChatMe-meT</h1>
      </div>
      <label>Add the perfect meme response to your clipboard</label>
      <div className="gallery">
        <img src={testImg} onClick={handleCopy} />
        <img src={testImg} onClick={handleCopy} />
      </div>
    </main>
  )
}

export default Popup
