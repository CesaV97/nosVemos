import { useEffect, useRef, useState } from 'react'
import { contactInfo } from '../data/contactInfo'
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  FacebookIcon,
} from './icons/SocialIcons'
import './Contact.css'

const CHANNELS = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    hint: 'Respuesta en minutos',
    accent: 'whatsapp',
    external: true,
    icon: <WhatsAppIcon />,
  },
  {
    key: 'phone',
    label: 'Celular',
    hint: 'Llámanos directo',
    accent: 'phone',
    external: false,
    icon: <PhoneIcon />,
  },
  {
    key: 'email',
    label: 'Correo',
    hint: 'Para cotizaciones',
    accent: 'email',
    external: false,
    icon: <MailIcon />,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    hint: 'Mira nuestro trabajo',
    accent: 'instagram',
    external: true,
    icon: <InstagramIcon />,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    hint: 'Síguenos',
    accent: 'facebook',
    external: true,
    icon: <FacebookIcon />,
  },
]

export default function Contact() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="section-inner">
        <div className={`section-header reveal ${visible ? 'visible' : ''}`}>
          <p className="section-eyebrow">Contacto</p>
          <h2 className="section-title">
            Hablemos de tu <em>evento</em>
          </h2>
          <p className="section-subtitle">
            Escríbenos por el medio que prefieras. Te respondemos el mismo día
            para ayudarte a elegir tu invitación.
          </p>
        </div>

        <div className="contact__grid">
          {CHANNELS.map((channel, i) => {
            const info = contactInfo[channel.key]
            return (
              <a
                key={channel.key}
                href={info.href}
                className={`contact-card contact-card--${channel.accent} reveal ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="contact-card__icon">{channel.icon}</span>
                <span className="contact-card__body">
                  <span className="contact-card__label">{channel.label}</span>
                  <span className="contact-card__value">{info.display}</span>
                  <span className="contact-card__hint">{channel.hint}</span>
                </span>
                <span className="contact-card__arrow" aria-hidden="true">→</span>
              </a>
            )
          })}
        </div>

        <div className={`contact__cta reveal ${visible ? 'visible' : ''} reveal-delay-3`}>
          <p className="contact__cta-text">
            ¿Prefieres que te escribamos nosotros?
          </p>
          <a
            href={contactInfo.whatsapp.href}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iniciar chat por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
