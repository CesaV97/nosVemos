import { useEffect, useState } from 'react'
import { contactInfo } from '../data/contactInfo'
import { WhatsAppIcon } from './icons/SocialIcons'
import './WhatsAppFloat.css'

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Aparece tras salir del hero para no competir con el CTA principal
    const handleScroll = () => setVisible(window.scrollY > 400)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={contactInfo.whatsapp.href}
      className={`wa-float ${visible ? 'wa-float--visible' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <WhatsAppIcon className="wa-float__icon" />
      <span className="wa-float__label">Escríbenos</span>
    </a>
  )
}
