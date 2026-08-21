import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { templates, packages, COMPONENT_ORDER, COMPONENT_METADATA } from '../data/mockData'
import { usePackageStore } from '../stores/packageStore'
import {
  SparkleIcon, ClockIcon, PinIcon, ChatIcon, ChurchIcon, DressIcon,
  CheckCircleIcon, PhotosIcon, MusicIcon, LockIcon,
  PhoneDeviceIcon, DesktopIcon, CheckIcon, ArrowRightIcon,
} from './icons/UiIcons'
import './TemplateGallery.css'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'boda', label: 'Bodas' },
  { id: 'quinceanera', label: 'Quinceañeras' },
  { id: 'fiesta', label: 'Fiestas' },
  { id: 'corporativo', label: 'Corporativos' },
]

// Acentos oscurecidos respecto a la versión anterior para cumplir 4.5:1 sobre fondo claro
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

// Ícono por sección — reemplaza los emoji de COMPONENT_METADATA
const SECTION_ICONS = {
  hero: SparkleIcon,
  countdown: ClockIcon,
  reception: PinIcon,
  message: ChatIcon,
  ceremony: ChurchIcon,
  dresscode: DressIcon,
  rsvp: CheckCircleIcon,
  gallery: PhotosIcon,
  music: MusicIcon,
}

/* =========================================================
   Paso 2 — Qué incluye el paquete
   ========================================================= */

function SectionChips({ includedComponents, onJump, activeSection }) {
  const included = COMPONENT_ORDER.filter(k => includedComponents.includes(k))
  const locked = COMPONENT_ORDER.filter(k => !includedComponents.includes(k))

  // Paquete más económico que sí incluye la sección → upsell honesto
  const unlockPackageFor = (key) =>
    packages.find(p => p.includedComponents.includes(key))?.name

  return (
    <ul className="gallery__chips">
      {included.map(key => {
        const Icon = SECTION_ICONS[key]
        const meta = COMPONENT_METADATA[key]
        return (
          <li key={key}>
            <button
              type="button"
              className={`gallery-chip ${activeSection === key ? 'gallery-chip--active' : ''}`}
              onClick={() => onJump(key)}
              title={meta.description}
            >
              <Icon className="gallery-chip__icon" />
              <span className="gallery-chip__label">{meta.label}</span>
            </button>
          </li>
        )
      })}

      {locked.map(key => {
        const meta = COMPONENT_METADATA[key]
        const unlock = unlockPackageFor(key)
        const note = unlock
          ? `Disponible en el paquete ${unlock}`
          : 'No disponible en ningún paquete'
        return (
          <li key={key}>
            <span className="gallery-chip gallery-chip--locked" title={note}>
              <LockIcon className="gallery-chip__icon" />
              <span className="gallery-chip__label">{meta.label}</span>
              <span className="sr-only">{note}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/* =========================================================
   Paso 1 — Tarjeta de plantilla
   ========================================================= */

function TemplateCard({ template, active, onSelect }) {
  const config = THEME_CONFIG[template.theme]
  const preview = template.previewLines

  return (
    <button
      type="button"
      className={`tpl-card ${active ? 'tpl-card--active' : ''}`}
      data-theme={template.theme}
      onClick={() => onSelect(template)}
      aria-pressed={active}
      aria-label={`Plantilla ${template.name}, ${template.categoryLabel}`}
    >
      {/* Mini portada: usa el ornamento y color reales del tema */}
      <span className="tpl-card__cover">
        <span className="tpl-card__ornament" style={{ color: config.accent }}>
          {config.ornament}
        </span>
        <span className="tpl-card__names" style={{ color: config.accent }}>
          {preview?.names || template.name}
        </span>
        <span className="tpl-card__date">{preview?.date}</span>

        {template.popular && (
          <span className="tpl-card__badge">Popular</span>
        )}

        <span className="tpl-card__check" aria-hidden="true">
          <CheckIcon />
        </span>
      </span>

      <span className="tpl-card__meta">
        <span className="tpl-card__name">{template.name}</span>
        <span className="tpl-card__category">{template.categoryLabel}</span>
      </span>
    </button>
  )
}

/* =========================================================
   Paso 3 — Secciones dentro del preview
   ========================================================= */

function SectionBlock({ sectionKey, config, preview, forwardRef }) {
  const Icon = SECTION_ICONS[sectionKey]
  const meta = COMPONENT_METADATA[sectionKey]
  const accent = config.accent

  const content = {
    hero: (
      <>
        <span className="pv__ornament" style={{ color: accent }}>{config.ornament}</span>
        <h4 className="pv__names" style={{ color: accent }}>{preview.names}</h4>
        <p className="pv__tagline">{preview.tagline}</p>
        <p className="pv__date" style={{ color: accent }}>{preview.date}</p>
      </>
    ),
    countdown: (
      <>
        <p className="pv__eyebrow">Faltan</p>
        <span className="pv__countdown">
          {[['245', 'días'], ['06', 'hrs'], ['12', 'min']].map(([n, l]) => (
            <span className="pv__countdown-cell" key={l}>
              <strong style={{ color: accent }}>{n}</strong>
              <em>{l}</em>
            </span>
          ))}
        </span>
      </>
    ),
    reception: (
      <>
        <p className="pv__title">Recepción</p>
        <p className="pv__body">{preview.place}</p>
        <p className="pv__body pv__body--muted">20:00 hrs · Ver en Maps</p>
      </>
    ),
    message: (
      <p className="pv__quote">
        Nos llena de alegría compartir este día tan especial contigo.
      </p>
    ),
    ceremony: (
      <>
        <p className="pv__title">Ceremonia</p>
        <p className="pv__body">Parroquia San Miguel</p>
        <p className="pv__body pv__body--muted">17:00 hrs</p>
      </>
    ),
    dresscode: (
      <>
        <p className="pv__title">Código de vestimenta</p>
        <p className="pv__body">Etiqueta · Marfil y dorado</p>
      </>
    ),
    rsvp: (
      <>
        <p className="pv__title">Confirmar asistencia</p>
        <span className="pv__btn" style={{ background: accent }}>
          Confirmar por WhatsApp
        </span>
      </>
    ),
    gallery: (
      <>
        <p className="pv__title">Galería</p>
        <span className="pv__grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ background: `${accent}22` }} />
          ))}
        </span>
      </>
    ),
    music: (
      <>
        <p className="pv__title">Música</p>
        <span className="pv__track">
          <span className="pv__track-bar">
            <span style={{ background: accent, width: '42%' }} />
          </span>
          <em>Canción de fondo al abrir</em>
        </span>
      </>
    ),
  }[sectionKey]

  return (
    <div className="pv__section" ref={forwardRef} data-section={sectionKey}>
      {sectionKey !== 'hero' && (
        <span
          className="pv__section-icon"
          style={{ color: accent, background: `${accent}14` }}
          aria-hidden="true"
        >
          <Icon />
        </span>
      )}
      <span className="pv__section-body">{content}</span>
      <span className="sr-only">{meta.label}</span>
    </div>
  )
}

function InvitationPreview({ template, includedComponents, sectionRefs }) {
  const config = THEME_CONFIG[template.theme]
  const preview = template.previewLines || {
    names: template.name,
    tagline: 'Celebración especial',
    date: '2026',
    place: 'Lugar por definir',
  }

  return (
    <div className="pv" data-theme={template.theme}>
      {COMPONENT_ORDER.filter(k => includedComponents.includes(k)).map(key => (
        <SectionBlock
          key={key}
          sectionKey={key}
          config={config}
          preview={preview}
          forwardRef={el => { sectionRefs.current[key] = el }}
        />
      ))}
    </div>
  )
}

/* =========================================================
   Sección
   ========================================================= */

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTemplateId, setActiveTemplateId] = useState(templates[0]?.id ?? null)
  const [device, setDevice] = useState('mobile') // 'mobile' | 'desktop'
  const [activeSection, setActiveSection] = useState('hero')
  const [visible, setVisible] = useState(false)

  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const sectionRefs = useRef({})

  const selectedPackageId = usePackageStore(state => state.selectedPackageId)
  const selectedPackage = packages.find(p => p.id === selectedPackageId) || packages[1]
  const includedComponents = selectedPackage.includedComponents

  const filtered = useMemo(
    () => (activeCategory === 'all'
      ? templates
      : templates.filter(t => t.category === activeCategory)),
    [activeCategory]
  )

  // La plantilla activa siempre debe existir dentro del filtro actual
  const activeTemplate =
    filtered.find(t => t.id === activeTemplateId) || filtered[0] || null

  useEffect(() => {
    if (activeTemplate && activeTemplate.id !== activeTemplateId) {
      setActiveTemplateId(activeTemplate.id)
    }
  }, [activeTemplate, activeTemplateId])

  // Reveal de la sección completa
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Chip activo según la sección visible dentro del preview.
  // En escritorio el viewport es el contenedor con scroll; en móvil es la página.
  useEffect(() => {
    const root = viewportRef.current
    if (!root) return

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const observer = new IntersectionObserver(
      entries => {
        const shown = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (shown) setActiveSection(shown.target.dataset.section)
      },
      { root: isDesktop ? root : null, threshold: 0.55 }
    )

    Object.values(sectionRefs.current)
      .filter(Boolean)
      .forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [activeTemplate, includedComponents, device])

  const handleJump = (key) => {
    const el = sectionRefs.current[key]
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setActiveSection(key)
  }

  const demoId = activeTemplate ? DEMO_INVITATION_MAP[activeTemplate.category] : 'demo-boda'

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="section-inner">
        <div className={`section-header reveal ${visible ? 'visible' : ''}`}>
          <p className="section-eyebrow">Nuestras Plantillas</p>
          <h2 className="section-title">
            Diseños para cada <em>gran ocasión</em>
          </h2>
          <p className="section-subtitle">
            Elige un diseño, revisa qué incluye tu paquete y míralo tal como lo
            recibirán tus invitados.
          </p>
        </div>

        <div className="gallery__layout">
          {/* ---------- Paso 1: elegir ---------- */}
          <div className="gallery__picker">
            <div className="gallery__step">
              <span className="gallery__step-num">1</span>
              <span className="gallery__step-text">
                <span className="gallery__step-title">Elige tu diseño</span>
                <span className="gallery__step-hint">
                  {filtered.length}{' '}
                  {filtered.length === 1 ? 'plantilla disponible' : 'plantillas disponibles'}
                </span>
              </span>
            </div>

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

            <div className="gallery__cards">
              {filtered.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  active={activeTemplate?.id === template.id}
                  onSelect={t => setActiveTemplateId(t.id)}
                />
              ))}
            </div>
          </div>

          {/* ---------- Pasos 2 y 3: entender + previsualizar ---------- */}
          <div className="gallery__stage">
            <div className="gallery__step">
              <span className="gallery__step-num">2</span>
              <span className="gallery__step-text">
                <span className="gallery__step-title">Qué incluye tu paquete</span>
                <span className="gallery__step-hint">
                  Paquete <strong>{selectedPackage.name}</strong> ·{' '}
                  {includedComponents.length} de {COMPONENT_ORDER.length} secciones ·{' '}
                  <a href="#pricing" className="gallery__change-link">Cambiar</a>
                </span>
              </span>
            </div>

            <SectionChips
              includedComponents={includedComponents}
              onJump={handleJump}
              activeSection={activeSection}
            />

            <div className="gallery__step gallery__step--with-toggle">
              <span className="gallery__step-num">3</span>
              <span className="gallery__step-text">
                <span className="gallery__step-title">Vista previa</span>
                <span className="gallery__step-hint">Así la verán tus invitados</span>
              </span>

              <div className="gallery__device-toggle" role="group" aria-label="Tamaño de vista previa">
                <button
                  type="button"
                  className={`device-btn ${device === 'mobile' ? 'device-btn--active' : ''}`}
                  onClick={() => setDevice('mobile')}
                  aria-pressed={device === 'mobile'}
                >
                  <PhoneDeviceIcon />
                  <span>Celular</span>
                </button>
                <button
                  type="button"
                  className={`device-btn ${device === 'desktop' ? 'device-btn--active' : ''}`}
                  onClick={() => setDevice('desktop')}
                  aria-pressed={device === 'desktop'}
                >
                  <DesktopIcon />
                  <span>Escritorio</span>
                </button>
              </div>
            </div>

            {activeTemplate && (
              <>
                <div className={`gallery__frame gallery__frame--${device}`}>
                  <div className="gallery__frame-bar" aria-hidden="true">
                    <span className="gallery__frame-dots"><i /><i /><i /></span>
                    <span className="gallery__frame-url">nosvemos.mx/invite</span>
                  </div>

                  <div className="gallery__viewport" ref={viewportRef}>
                    <InvitationPreview
                      key={`${activeTemplate.id}-${device}`}
                      template={activeTemplate}
                      includedComponents={includedComponents}
                      sectionRefs={sectionRefs}
                    />
                  </div>
                </div>

                <div className="gallery__cta">
                  <Link
                    to={`/invite/${demoId}?pkg=${selectedPackageId}`}
                    className="btn btn-primary gallery__cta-btn"
                  >
                    Abrir invitación completa
                    <ArrowRightIcon className="gallery__cta-icon" />
                  </Link>
                  <p className="gallery__cta-note">
                    Se abre igual que el enlace que recibirán tus invitados.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
