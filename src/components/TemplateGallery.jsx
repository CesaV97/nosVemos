import { useState, useEffect, useRef } from 'react'
import { templates } from '../data/mockData'
import './TemplateGallery.css'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'boda', label: 'Bodas' },
  { id: 'quinceanera', label: 'Quinceañeras' },
  { id: 'fiesta', label: 'Fiestas' },
  { id: 'corporativo', label: 'Corporativos' },
]

// Mini invitation ornaments by theme
const THEME_CONFIG = {
  'boda-clasica':       { ornament: '◆', accent: '#C8A96E', title: 'Clásica', date: '15 · Jun · 2025' },
  'boda-bohemio':       { ornament: '❧', accent: '#8DB870', title: 'Bohemio', date: '7 · Sep · 2025' },
  'boda-moderna':       { ornament: '—', accent: '#D0D0C8', title: 'Moderna', date: '8 · Nov · 2025' },
  'quince-rosa':        { ornament: '✿', accent: '#E8A0BF', title: 'Princesa', date: '22 · Mar · 2025' },
  'quince-gold':        { ornament: '♛', accent: '#D4AF37', title: 'Glamour', date: '5 · Abr · 2025' },
  'quince-jardin':      { ornament: '✾', accent: '#78C878', title: 'Jardín', date: '10 · May · 2025' },
  'fiesta':             { ornament: '★', accent: '#60B0F0', title: 'Neon', date: '31 · Oct · 2025' },
  'fiesta-jardin':      { ornament: '☼', accent: '#D08040', title: 'México', date: '16 · Sep · 2025' },
  'corporativo':        { ornament: '◈', accent: '#90B8D8', title: 'Ejecutivo', date: '12 · Dic · 2025' },
  'corporativo-moderno':{ ornament: '⬡', accent: '#70C0D0', title: 'Innovación', date: '20 · Feb · 2026' },
}

function MiniInvitation({ theme }) {
  const config = THEME_CONFIG[theme] || THEME_CONFIG['boda-clasica']
  return (
    <div
      className="mini-inv"
      style={{ border: `1px solid ${config.accent}30` }}
    >
      <div className="mini-inv__type" style={{ color: `${config.accent}` }}>
        Invitación
      </div>
      <div className="mini-inv__ornament" style={{ color: config.accent }}>
        {config.ornament}
      </div>
      <div className="mini-inv__title" style={{ color: config.accent }}>
        {config.title}
      </div>
      <div
        className="mini-inv__line"
        style={{ background: `linear-gradient(90deg, transparent, ${config.accent}, transparent)` }}
      />
      <div className="mini-inv__date" style={{ color: `${config.accent}AA` }}>
        {config.date}
      </div>
    </div>
  )
}

function TemplateCard({ template, delay }) {
  return (
    <div
      className="template-card"
      data-theme={template.theme}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="template-card__preview">
        <MiniInvitation theme={template.theme} />
        <span className="template-card__badge">{template.categoryLabel}</span>
        {template.popular && (
          <span className="template-card__popular">Popular</span>
        )}
      </div>
      <div className="template-card__info">
        <div className="template-card__name">{template.name}</div>
        <p className="template-card__desc">{template.description}</p>
        <span className="template-card__cta">
          Previsualizar →
        </span>
      </div>
    </div>
  )
}

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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

        {/* Category Filter */}
        <div className={`gallery__filters reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
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

        {/* Template Grid */}
        <div className="gallery__grid" key={activeCategory}>
          {filtered.map((template, i) => (
            <TemplateCard
              key={template.id}
              template={template}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
