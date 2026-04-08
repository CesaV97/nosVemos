import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="/" className="navbar__logo">
        <img
          src="https://res.cloudinary.com/dv22lqbsr/image/upload/v1775533014/nosvemos_logo_transparent_eiiftb.png"
          alt="nosVemos"
          className="navbar__logo-img"
        />
      </a>

      <div className="navbar__nav">        
        <button className="navbar__link" onClick={() => scrollTo('pricing')}>
          Precios
        </button>
        <button className="navbar__link" onClick={() => scrollTo('gallery')}>
          Plantillas
        </button>
        <a href="#" className="navbar__link">Cómo Funciona</a>
        <a href="#" className="navbar__link">Contacto</a>
      </div>

      <div className="navbar__actions">
        <button className="btn btn-ghost">
          Iniciar Sesión
        </button>
        <button className="btn btn-primary" onClick={() => scrollTo('gallery')}>
          Ver Plantillas
        </button>
      </div>

      <button className="navbar__menu-btn" aria-label="Menú">
        <span /><span /><span />
      </button>
    </nav>
  )
}
