import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { templates, packages, COMPONENT_ORDER } from '../data/mockData'
import { usePackageStore } from '../stores/packageStore'
import './TemplateGallery.css'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'boda', label: 'Bodas' },
  { id: 'quinceanera', label: 'Quinceañeras' },
  { id: 'fiesta', label: 'Fiestas' },
  { id: 'corporativo', label: 'Corporativos' },
]

const THEME_CONFIG = {
  'boda-clasica':       { ornament: '◆', accent: '#C8A96E' },
  'boda-bohemio':       { ornament: '❧', accent: '#8DB870' },
  'boda-moderna':       { ornament: '—', accent: '#A89878' },
  'quince-rosa':        { ornament: '✿', accent: '#E8A0BF' },
  'quince-gold':        { ornament: '♛', accent: '#D4AF37' },
  'quince-jardin':      { ornament: '✾', accent: '#78C878' },
  'fiesta':             { ornament: '★', accent: '#60B0F0' },
  'fiesta-jardin':      { ornament: '☼', accent: '#D08040' },
  'corporativo':        { ornament: '◈', accent: '#90B8D8' },
  'corporativo-moderno':{ ornament: '⬡', accent: '#70C0D0' },
}

const DEMO_INVITATION_MAP = {
  'boda': 'demo-boda',
  'quinceanera': 'demo-quince',
  'fiesta': 'demo-boda',
  'corporativo': 'demo-boda',
}

/* ----- Mini section previews ----- */

function PreviewHero({ config, preview }) {
  return (
    <>
      <div className="gallery__phone-section-icon" style={{ color: config.accent, fontSize: '32px' }}>
        {config.ornament}
      </div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '1.25rem' }}>
        {preview.names}
      </h3>
      <p className="gallery__phone-section-detail" style={{ color: config.accent }}>
        {preview.tagline}
      </p>
      <p className="gallery__phone-section-detail" style={{ color: config.accent, fontWeight: 500 }}>
        {preview.date}
      </p>
    </>
  )
}

function PreviewCountdown({ config }) {
  return (
    <>
      <div className="gallery__phone-section-detail" style={{ color: config.accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.6rem' }}>
        Faltan
      </div>
      <div className="gallery__phone-countdown-num" style={{ color: config.accent }}>
        245 días
      </div>
    </>
  )
}

function PreviewReception({ config, preview }) {
  return (
    <>
      <div className="gallery__phone-section-icon">📍</div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '0.9rem' }}>
        Recepción
      </h3>
      <p className="gallery__phone-section-detail" style={{ color: config.accent }}>
        {preview.place}
      </p>
    </>
  )
}

function PreviewMessage({ config }) {
  return (
    <>
      <div className="gallery__phone-section-icon">💬</div>
      <p className="gallery__phone-section-detail" style={{ color: config.accent, fontStyle: 'italic' }}>
        "Nos llena de alegría compartir este día tan especial contigo"
      </p>
    </>
  )
}

function PreviewCeremony({ config }) {
  return (
    <>
      <div className="gallery__phone-section-icon">⛪</div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '0.9rem' }}>
        Ceremonia
      </h3>
      <p className="gallery__phone-section-detail" style={{ color: config.accent }}>
        Parroquia San Miguel · 17:00 hrs
      </p>
    </>
  )
}

function PreviewDressCode({ config }) {
  return (
    <>
      <div className="gallery__phone-section-icon">👗</div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '0.9rem' }}>
        Código de Vestimenta
      </h3>
      <p className="gallery__phone-section-detail" style={{ color: config.accent }}>
        Etiqueta · Marfil y dorado
      </p>
    </>
  )
}

function PreviewRSVP({ config }) {
  return (
    <>
      <div className="gallery__phone-section-icon">✅</div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '0.9rem' }}>
        Confirmar Asistencia
      </h3>
      <span className="gallery__phone-rsvp-btn" style={{ color: config.accent, background: `${config.accent}20` }}>
        📱 Confirmar por WhatsApp
      </span>
    </>
  )
}

function PreviewGallery({ config }) {
  return (
    <>
      <div className="gallery__phone-section-icon">🖼</div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '0.9rem' }}>
        Galería
      </h3>
      <div className="gallery__phone-gallery-grid">
        <div style={{ background: `${config.accent}25` }} />
        <div style={{ background: `${config.accent}25` }} />
        <div style={{ background: `${config.accent}25` }} />
        <div style={{ background: `${config.accent}25` }} />
      </div>
    </>
  )
}

function PreviewMusic({ config }) {
  return (
    <>
      <div className="gallery__phone-section-icon">🎵</div>
      <h3 className="gallery__phone-section-title" style={{ color: config.accent, fontSize: '0.9rem' }}>
        Música
      </h3>
      <div style={{
        width: '70%',
        height: '4px',
        background: `${config.accent}20`,
        borderRadius: '2px',
        position: 'relative',
        marginTop: '4px',
      }}>
        <div style={{
          width: '40%',
          height: '100%',
          background: config.accent,
          borderRadius: '2px',
        }} />
      </div>
    </>
  )
}

function PhoneInvitationPreview({ template, includedComponents }) {
  const config = THEME_CONFIG[template.theme]
  const preview = template.previewLines || {
    names: template.name,
    tagline: 'Celebración especial',
    date: '2026',
    place: 'Lugar por definir',
  }

  const sections = {
    hero:      <PreviewHero config={config} preview={preview} />,
    countdown: <PreviewCountdown config={config} />,
    reception: <PreviewReception config={config} preview={preview} />,
    message:   <PreviewMessage config={config} />,
    ceremony:  <PreviewCeremony config={config} />,
    dresscode: <PreviewDressCode config={config} />,
    rsvp:      <PreviewRSVP config={config} />,
    gallery:   <PreviewGallery config={config} />,
    music:     <PreviewMusic config={config} />,
  }

  return (
    <div className="gallery__phone-content-wrapper">
      {COMPONENT_ORDER.map(key =>
        includedComponents.includes(key) ? (
          <div key={key} className="gallery__phone-section">
            {sections[key]}
          </div>
        ) : null
      )}
    </div>
  )
}

function TemplateThumbnail({ template, active, onClick }) {
  const config = THEME_CONFIG[template.theme]

  return (
    <button
      className={`gallery__thumbnail ${active ? 'active' : ''}`}
      onClick={onClick}
      data-theme={template.theme}
      aria-label={`${template.name} template`}
      style={{ cursor: 'pointer', border: 'none', padding: 0, background: 'transparent' }}
    >
      <div className="gallery__thumbnail-background" />
      <div className="gallery__thumbnail-ornament" style={{ color: config.accent }}>
        {config.ornament}
      </div>
    </button>
  )
}

function TemplateThumbnailMobile({ template, active, onClick }) {
  const config = THEME_CONFIG[template.theme]

  return (
    <button
      className={`gallery__thumbnail-mobile ${active ? 'active' : ''}`}
      onClick={onClick}
      data-theme={template.theme}
      aria-label={`${template.name} template`}
      style={{ cursor: 'pointer', border: 'none', padding: 0, background: 'transparent' }}
    >
      <div className="gallery__thumbnail-background" />
      <div className="gallery__thumbnail-ornament" style={{ color: config.accent }}>
        {config.ornament}
      </div>
    </button>
  )
}

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTemplate, setActiveTemplate] = useState(null)
  const [isEntering, setIsEntering] = useState(false)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const selectedPackageId = usePackageStore(state => state.selectedPackageId)
  const selectedPackage = packages.find(p => p.id === selectedPackageId) || packages[1]
  const includedComponents = selectedPackage.includedComponents

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory)

  // Initialize active template and reset on category change
  useEffect(() => {
    setActiveTemplate(filtered[0])
    setIsEntering(true)
    const timer = setTimeout(() => setIsEntering(false), 280)
    return () => clearTimeout(timer)
  }, [activeCategory])

  // Handle template change with transition
  const handleTemplateClick = (template) => {
    if (template.id !== activeTemplate?.id) {
      setIsEntering(true)
      setActiveTemplate(template)
      setTimeout(() => setIsEntering(false), 280)
    }
  }

  // Intersection observer for section reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const demoId = activeTemplate ? DEMO_INVITATION_MAP[activeTemplate.category] : 'demo-boda'

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="section-inner">
        <div className={`section-header reveal ${visible ? 'visible' : ''}`}>
          <p className="section-eyebrow">Nuestras Plantillas</p>
          <h2 className="section-title">
            Diseños para cada <em style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>gran ocasión</em>
          </h2>
          <p className="section-subtitle">
            Explora nuestra colección de invitaciones digitales, elegantes y personalizables.
          </p>
        </div>

        {/* Package Indicator Banner */}
        <div className="gallery__package-banner">
          <span className="gallery__package-banner-label">Mostrando con paquete</span>
          <strong className="gallery__package-banner-name">{selectedPackage.name}</strong>
          <span className="gallery__package-banner-count">
            · {includedComponents.length} secciones
          </span>
          <a href="#pricing" className="gallery__package-banner-change">Cambiar paquete</a>
        </div>

        {/* Desktop Layout */}
        <div className="gallery__spotlight">
          {/* Left Panel */}
          <div className="gallery__panel-left">
            <div className="gallery__copy">
              <h3 className="gallery__copy-title">Vista previa en tiempo real</h3>
              <p className="gallery__copy-text">
                Cada invitación se optimiza para verse perfecta en WhatsApp. Selecciona un template y desliza dentro del teléfono para ver las secciones de tu paquete.
              </p>
            </div>

            {/* Category Filters (Desktop) */}
            <div className="gallery__filters-desktop">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Thumbnails (Desktop) */}
            <div className="gallery__thumbnails-desktop">
              {filtered.map(template => (
                <TemplateThumbnail
                  key={template.id}
                  template={template}
                  active={activeTemplate?.id === template.id}
                  onClick={() => handleTemplateClick(template)}
                />
              ))}
            </div>
          </div>

          {/* Phone Mockup (Center/Right) */}
          {activeTemplate && (
            <div className="gallery__phone-shell">
              <div className="gallery__phone-screen">
                <div className={`gallery__phone-content ${isEntering ? 'gallery__phone-content--entering' : ''}`}>
                  <PhoneInvitationPreview
                    template={activeTemplate}
                    includedComponents={includedComponents}
                  />
                </div>
              </div>
              <div className="gallery__phone-bar" />
            </div>
          )}
        </div>

        {/* Mobile Filters + Thumbnails (phone mockup is shared, rendered above in spotlight) */}
        <div className="gallery__filters-mobile">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery__thumbnails-mobile">
          {filtered.map(template => (
            <TemplateThumbnailMobile
              key={template.id}
              template={template}
              active={activeTemplate?.id === template.id}
              onClick={() => handleTemplateClick(template)}
            />
          ))}
        </div>

        {/* CTA Below Mockup */}
        {activeTemplate && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              to={`/invite/${demoId}?pkg=${selectedPackageId}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                background: 'var(--jade)',
                color: 'white',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s var(--ease)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(9,124,135,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Previsualizar invitación completa →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
