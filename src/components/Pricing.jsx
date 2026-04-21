import { useEffect, useRef, useState } from 'react'
import { packages, COMPONENT_METADATA, COMPONENT_ORDER } from '../data/mockData'
import { usePackageStore } from '../stores/packageStore'
import './Pricing.css'

function PackageCard({ pkg, delay, visible }) {
  const selectedPackageId = usePackageStore(state => state.selectedPackageId)
  const setSelectedPackage = usePackageStore(state => state.setSelectedPackage)
  const isSelected = pkg.id === selectedPackageId
  const [priceAdjustment, setPriceAdjustment] = useState(0)
  const adjustedPrice = pkg.price + priceAdjustment

  const isTileIncluded = (componentKey) => pkg.includedComponents.includes(componentKey)

  const handleSelect = () => {
    setSelectedPackage(pkg.id)
    document.getElementById('gallery')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handlePriceAdjust = (amount) => {
    const newAdjustment = priceAdjustment + amount
    if (newAdjustment >= -pkg.price) {
      setPriceAdjustment(newAdjustment)
    }
  }

  return (
    <div
      className={`package-card package-card--${pkg.color} ${isSelected ? 'package-card--selected' : ''} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, cursor: 'pointer' }}
      onClick={handleSelect}
    >
      {pkg.popular && !isSelected && (
        <div className="package-card__popular-badge">Más Popular</div>
      )}

      {isSelected && (
        <div className="package-card__selected-badge">✓ Seleccionado</div>
      )}

      <div className="package-card__name">{pkg.name}</div>

      <div className="package-card__price-container">
        <div className="package-card__price">
          <span className="package-card__currency">$</span>
          <span className="package-card__amount">
            {adjustedPrice.toLocaleString('es-MX')}
          </span>
          <span className="package-card__period">MXN</span>
        </div>
        <div className="package-card__price-adjusters">
          <button
            className="price-adjuster price-adjuster--minus"
            onClick={(e) => {
              e.stopPropagation()
              handlePriceAdjust(-500)
            }}
            title="Reducir precio"
          >
            −
          </button>
          <button
            className="price-adjuster price-adjuster--plus"
            onClick={(e) => {
              e.stopPropagation()
              handlePriceAdjust(500)
            }}
            title="Aumentar precio"
          >
            +
          </button>
        </div>
      </div>

      <p className="package-card__tagline">{pkg.tagline}</p>

      {/* Component List — Enabled first, then disabled */}
      <ul className="pricing__component-list">
        {/* Enabled items */}
        {COMPONENT_ORDER.filter(key => isTileIncluded(key)).map((componentKey) => {
          const metadata = COMPONENT_METADATA[componentKey]
          return (
            <li key={componentKey} className="pricing__component-item">
              {metadata.label}
            </li>
          )
        })}
        {/* Disabled items */}
        {COMPONENT_ORDER.filter(key => !isTileIncluded(key)).map((componentKey) => {
          const metadata = COMPONENT_METADATA[componentKey]
          return (
            <li
              key={componentKey}
              className="pricing__component-item pricing__component-item--excluded"
            >
              {metadata.label}
            </li>
          )
        })}
      </ul>

      <button className={`btn package-card__cta`}>
        {isSelected ? 'Ver mi preview ↓' : 'Ver con este paquete →'}
      </button>
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [scrollIndex, setScrollIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scroll = (direction) => {
    if (gridRef.current) {
      const newIndex = direction === 'next' ? scrollIndex + 1 : scrollIndex - 1
      if (newIndex >= 0 && newIndex < packages.length) {
        setScrollIndex(newIndex)
        const cardWidth = 300 + 12 // ancho de tarjeta + gap
        gridRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: 'smooth',
        })
      }
    }
  }

  const canScrollPrev = scrollIndex > 0
  const canScrollNext = scrollIndex < packages.length - 1

  return (
    <section className="pricing" id="pricing" ref={sectionRef}>
      <div className="section-inner">
        <div className={`section-header reveal ${visible ? 'visible' : ''}`}>
          <p className="section-eyebrow">Nuestros Paquetes</p>
          <h2 className="section-title">
            Elige el plan para tu{' '}
            <em style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>
              celebración
            </em>
          </h2>
          <p className="section-subtitle">
            Pago único por evento. Sin suscripciones, sin sorpresas.
            Incluye IVA y soporte por WhatsApp.
          </p>
        </div>

        <div className="pricing__controls">
          <button
            className={`pricing__nav-btn pricing__nav-btn--prev ${!canScrollPrev ? 'pricing__nav-btn--disabled' : ''}`}
            onClick={() => scroll('prev')}
            disabled={!canScrollPrev}
            aria-label="Paquete anterior"
          >
            ←
          </button>
          <button
            className={`pricing__nav-btn pricing__nav-btn--next ${!canScrollNext ? 'pricing__nav-btn--disabled' : ''}`}
            onClick={() => scroll('next')}
            disabled={!canScrollNext}
            aria-label="Siguiente paquete"
          >
            →
          </button>
        </div>

        <div className="pricing__grid" ref={gridRef}>
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              delay={i * 100}
              visible={visible}
            />
          ))}
        </div>

        <p
          className={`reveal ${visible ? 'visible' : ''} reveal-delay-3`}
          style={{
            textAlign: 'center',
            marginTop: '40px',
            fontSize: '0.82rem',
            color: 'var(--warm-gray)',
          }}
        >
          ¿Tienes dudas? Escríbenos por{' '}
          <a
            href="#"
            style={{
              color: 'var(--gold-dark)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            WhatsApp
          </a>{' '}
          y te ayudamos a elegir el paquete ideal.
        </p>
      </div>
    </section>
  )
}
