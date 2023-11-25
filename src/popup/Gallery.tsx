import GalleryImg from "./GalleryImg";

export const Gallery = ({ images }: {
    images: string[]
}) => {
    return (
        <div className="gallery">
            {images && images.map((image) => (
                <GalleryImg image={image} />
            ))}
            {images.length === 0 &&
                <p>¯\_(ツ)_/¯</p>
            }
        </div>
    );
};

export default Gallery;