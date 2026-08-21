import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { templates, packages, COMPONENT_ORDER } from '../data/mockData'
import { usePackageStore } from '../stores/packageStore'
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from './icons/UiIcons'
import './TemplateGallery.css'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'boda', label: 'Bodas' },
  { id: 'quinceanera', label: 'Quinceañeras' },
  { id: 'fiesta', label: 'Fiestas' },
  { id: 'corporativo', label: 'Corporativos' },
]

// Acentos con contraste >= 4.5:1 sobre el fondo claro de cada portada
const THEME_CONFIG = {
  'boda-clasica':       { ornament: '◆', accent: '#8C6D2F' },
  'boda-bohemio':       { ornament: '❧', accent: '#4A7038' },
  'boda-moderna':       { ornament: '—', accent: '#6B5C40' },
  'quince-rosa':        { ornament: '✿', accent: '#A8436B' },
  'quince-gold':        { ornament: '♛', accent: '#87691F' },
  'quince-jardin':      { ornament: '✾', accent: '#357032' },
  'fiesta':             { ornament: '★', accent: '#22639B' },
  'fiesta-jardin':      { ornament: '☼', accent: '#8A4419' },
  'corporativo':        { ornament: '◈', accent: '#355B7D' },
  'corporativo-moderno':{ ornament: '⬡', accent: '#166872' },
}

const DEMO_INVITATION_MAP = {
  boda: 'demo-boda',
  quinceanera: 'demo-quince',
  fiesta: 'demo-boda',
  corporativo: 'demo-boda',
}

/* --- Una portada ----------------------------------------- */

function TemplateSlide({ template, index, total }) {
  const config = THEME_CONFIG[template.theme]
  const preview = template.previewLines || {
    names: template.name,
    tagline: 'Celebración especial',
    date: '2026',
    place: 'Lugar por definir',
  }

  return (
    <li
      className="carousel__slide"
      data-theme={template.theme}
      aria-label={`${index + 1} de ${total}: ${template.name}`}
    >
      <div className="cover">
        <span className="cover__ornament" style={{ color: config.accent }}>
          {config.ornament}
        </span>

        <h3 className="cover__names" style={{ color: config.accent }}>
          {preview.names}
        </h3>

        <p className="cover__tagline">{preview.tagline}</p>

        <span className="cover__rule" style={{ background: config.accent }} />

        <p className="cover__date" style={{ color: config.accent }}>
          {preview.date}
        </p>

        <p className="cover__place">{preview.place}</p>

        {template.popular && <span className="cover__badge">Más elegida</span>}
      </div>
    </li>
  )
}

/* --- Sección --------------------------------------------- */

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)

  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const selectedPackageId = usePackageStore(state => state.selectedPackageId)
  const selectedPackage = packages.find(p => p.id === selectedPackageId) || packages[1]

  const filtered = useMemo(
    () => (activeCategory === 'all'
      ? templates
      : templates.filter(t => t.category === activeCategory)),
    [activeCategory]
  )

  const total = filtered.length
  const activeTemplate = filtered[Math.min(current, total - 1)] || null

  // Reveal de la sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Al cambiar de categoría se vuelve al inicio
  useEffect(() => {
    setCurrent(0)
    trackRef.current?.scrollTo({ left: 0, behavior: 'auto' })
  }, [activeCategory])

  // El scroll nativo es la fuente de verdad: funciona igual con swipe,
  // rueda del mouse, flechas y barra de scroll
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        // La portada más cercana al centro de la pista es la actual.
        // Se mide sobre los elementos reales porque en celular las
        // portadas no ocupan el ancho completo (asoma la siguiente).
        const center = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDistance = Infinity

        Array.from(track.children).forEach((slide, i) => {
          const distance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center)
          if (distance < bestDistance) {
            bestDistance = distance
            best = i
          }
        })

        setCurrent(prev => (prev === best ? prev : best))
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const goTo = useCallback((index) => {
    const track = trackRef.current
    if (!track) return

    const clamped = Math.max(0, Math.min(index, total - 1))
    const slide = track.children[clamped]
    if (!slide) return

    // Centrar la portada elegida; el navegador limita el valor en los extremos
    const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2
    track.scrollTo({ left, behavior: 'smooth' })
    setCurrent(clamped)
  }, [total])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1) }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1) }
  }

  const demoId = activeTemplate ? DEMO_INVITATION_MAP[activeTemplate.category] : 'demo-boda'
  const sectionCount = selectedPackage.includedComponents.length

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="section-inner">
        <div className={`section-header reveal ${visible ? 'visible' : ''}`}>
          <p className="section-eyebrow">Nuestras Plantillas</p>
          <h2 className="section-title">
            Diseños para cada <em>gran ocasión</em>
          </h2>
          <p className="section-subtitle">
            Desliza para conocerlas. Cualquiera se adapta a tu evento.
          </p>
        </div>

        {/* Categorías */}
        <div className="gallery__filters" role="tablist" aria-label="Categorías">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {activeTemplate && (
          <>
            {/* Posición actual */}
            <p className="carousel__counter" aria-live="polite">
              {current + 1} <span>/</span> {total}
            </p>

            {/* Carrusel */}
            <div
              className="carousel"
              role="group"
              aria-roledescription="carrusel"
              aria-label="Plantillas de invitación"
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <button
                type="button"
                className="carousel__arrow carousel__arrow--prev"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                aria-label="Plantilla anterior"
              >
                <ChevronLeftIcon />
              </button>

              <ul className="carousel__track" ref={trackRef}>
                {filtered.map((template, i) => (
                  <TemplateSlide
                    key={template.id}
                    template={template}
                    index={i}
                    total={total}
                  />
                ))}
              </ul>

              <button
                type="button"
                className="carousel__arrow carousel__arrow--next"
                onClick={() => goTo(current + 1)}
                disabled={current >= total - 1}
                aria-label="Siguiente plantilla"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Puntos */}
            {total > 1 && (
              <div className="carousel__dots">
                {filtered.map((template, i) => (
                  <button
                    key={template.id}
                    type="button"
                    className={`carousel__dot ${i === current ? 'carousel__dot--active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Ir a ${template.name}`}
                    aria-current={i === current}
                  />
                ))}
              </div>
            )}

            {/* Nombre de la plantilla a la vista */}
            <div className="gallery__caption">
              <h3 className="gallery__caption-name">{activeTemplate.name}</h3>
              <p className="gallery__caption-meta">
                {activeTemplate.categoryLabel} · {activeTemplate.description}
              </p>
            </div>

            {/* CTA */}
            <div className="gallery__cta">
              <Link
                to={`/invite/${demoId}?pkg=${selectedPackageId}`}
                className="btn btn-primary gallery__cta-btn"
              >
                Ver invitación completa
                <ArrowRightIcon className="gallery__cta-icon" />
              </Link>
              <p className="gallery__cta-note">
                Con tu paquete <strong>{selectedPackage.name}</strong> incluye{' '}
                {sectionCount} de {COMPONENT_ORDER.length} secciones ·{' '}
                <a href="#pricing" className="gallery__change-link">Cambiar paquete</a>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
