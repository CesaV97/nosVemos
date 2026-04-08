import { useState, useEffect } from 'react'
import './Countdown.css'

/**
 * Contador en vivo hacia la fecha del evento
 * Actualiza cada segundo
 */

export default function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  function calculateTimeLeft() {
    const now = new Date()
    const event = new Date(eventDate)
    const diff = event - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true }
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      ended: false,
    }
  }

  if (timeLeft.ended) {
    return (
      <section className="inv-countdown">
        <div className="inv-countdown__text">¡El evento ya comenzó!</div>
      </section>
    )
  }

  return (
    <section className="inv-countdown">
      <div className="inv-countdown__label">Faltan</div>

      <div className="inv-countdown__grid">
        <div className="inv-countdown__unit">
          <span className="inv-countdown__value">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="inv-countdown__label-unit">días</span>
        </div>
        <div className="inv-countdown__separator">:</div>
        <div className="inv-countdown__unit">
          <span className="inv-countdown__value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="inv-countdown__label-unit">horas</span>
        </div>
        <div className="inv-countdown__separator">:</div>
        <div className="inv-countdown__unit">
          <span className="inv-countdown__value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="inv-countdown__label-unit">min</span>
        </div>
        <div className="inv-countdown__separator">:</div>
        <div className="inv-countdown__unit">
          <span className="inv-countdown__value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="inv-countdown__label-unit">seg</span>
        </div>
      </div>
    </section>
  )
}
