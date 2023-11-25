import { useEffect, useState } from 'react'
import './Popup.css'

async function getCanvasBlob(src: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to get canvas blob'))
          }
        })
      } else {
        reject(new Error('Failed to get canvas context'))
      }
    }
    img.src = src
  })
}

async function copyToClipboard(src: string) {
  console.log('Copying image to clipboard...')

  try {
    const pngBlob = await getCanvasBlob(src)
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

export const GalleryImg = ({ image }: { image: string }) => {
  const handleCopy = () => {
    if (image) {
      copyToClipboard(image)
    }
  }

  return (
    <div className="img-wrapper">
      <img src={image} onClick={handleCopy} />
    </div>
  )
}

export default GalleryImg
