import { useState } from 'react'
import Gallery from './Gallery'
import logo from '../assets/logo.png'

import './Popup.css'
import { ImageSearchResult } from '../lib/imageSearch/bing'

export const Popup = () => {
  const [genre, setGenre] = useState('')
  const [memes, setMemes] = useState<string[]>([])

  const createGallery = (currentGenre: string) => {
    chrome.runtime.sendMessage({ type: 'SEARCH', genre: currentGenre })
    setMemes([])

    const onMessage = (request: any) => {
      console.log(request)
      if (request.type === 'SEARCH') {
        setMemes(request.images.map((image: ImageSearchResult) => image.thumbnailUrl))
        chrome.runtime.onMessage.removeListener(onMessage)
      }
    }

    // Listen for messages
    chrome.runtime.onMessage.addListener(onMessage)
  }

  return (
    <main className="centered">
      <div className="header">
        <img width="12%" src={logo} />
        <h1>ChatMe-meT</h1>
      </div>
      <label>Add the perfect meme response to your clipboard</label>
      <select
        onChange={(e) => {
          setGenre(e.target.value)
          createGallery(e.target.value)
        }}
      >
        <option disabled selected className="disabled">
          Select a meme genre
        </option>
        <option value="Any">Any</option>
        <option value="Facebook Mom">Facebook Mom</option>
        <option value="Dank">Dank</option>
        <option value="Surrealist">Surrealist</option>
        <option value="Wholesome">Wholesome</option>
        <option value="Reddit">Redditor</option>
      </select>
      {genre !== '' && <Gallery images={memes} />}
    </main>
  )
}

export default Popup
