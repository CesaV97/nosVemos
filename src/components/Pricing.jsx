import { useEffect, useRef, useState } from 'react'
import { packages } from '../data/mockData'
import './Pricing.css'

function FeatureIcon({ included }) {
  return (
    <span className={`package-feature__icon`}>
      {included ? '✓' : '×'}
    </span>
  )
}

function PackageCard({ pkg, delay, visible }) {
  return (
    <div
      className={`package-card package-card--${pkg.color} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {pkg.popular && (
        <div className="package-card__popular-badge">Más Popular</div>
      )}

      <div className="package-card__name">{pkg.name}</div>

      <div className="package-card__price">
        <span className="package-card__currency">$</span>
        <span className="package-card__amount">
          {pkg.price.toLocaleString('es-MX')}
        </span>
        <span className="package-card__period">MXN</span>
      </div>

      <p className="package-card__tagline">{pkg.tagline}</p>

      <ul className="package-card__features">
        {pkg.features.map((feat, i) => (
          <li
            key={i}
            className={`package-feature package-feature--${feat.included ? 'included' : 'excluded'}`}
          >
            <FeatureIcon included={feat.included} />
            <span>{feat.text}</span>
          </li>
        ))}
      </ul>

      <button className={`btn package-card__cta`}>
        {pkg.cta}
      </button>
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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

        <div className="pricing__grid">
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
