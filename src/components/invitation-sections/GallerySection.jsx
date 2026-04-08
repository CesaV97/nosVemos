import './GallerySection.css'

export default function GallerySection({ gallery }) {
  if (!gallery || !gallery.enabled || !gallery.photos || gallery.photos.length === 0) return null

  return (
    <section className="inv-gallery">
      <h2 className="inv-gallery__title">Galería</h2>
      <div className="inv-gallery__grid">
        {gallery.photos.map((photo, idx) => (
          <figure key={idx} className="inv-gallery__item">
            <img src={photo.url} alt={photo.caption} className="inv-gallery__image" />
            {photo.caption && <figcaption className="inv-gallery__caption">{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}
