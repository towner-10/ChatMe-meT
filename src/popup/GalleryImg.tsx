import { useEffect, useState } from 'react';
import './Popup.css';
import testImg from '../assets/test.png'

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

export const GalleryImg = ({ image }: {
    image: string
}) => {
    const [pngBlob, setPngBlob] = useState<Blob>()

    useEffect(() => {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => setPngBlob(blob))
    }, [])
  
    const handleCopy = () => {
      if (pngBlob) {
        copyToClipboard(pngBlob)
      }
    }

    return (
        <div className="img-wrapper">
            <img src={image} onClick={handleCopy} />
        </div>
    );
};

export default GalleryImg;
