import Gallery from './Gallery';
import logoAlt from '../assets/logo.png'

import './Popup.css'

export const Popup = () => {
  return (
    <main className="centered">
      <div className="header">
        <img width="12%" src={logoAlt}/>
        <h1>ChatMe–meT</h1>
      </div>
      <label>Add the perfect meme response to your clipboard</label>
      <Gallery images={[]}/>
    </main>
  )
}

export default Popup
