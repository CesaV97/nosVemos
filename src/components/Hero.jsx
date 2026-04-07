import { carouselCards } from '../data/mockData'
import './Hero.css'

function InvitationCard({ card }) {
  return (
    <div className={`inv-card inv-card--${card.theme}`}>
      <span className="inv-card__corner inv-card__corner--tl">✦</span>
      <span className="inv-card__corner inv-card__corner--tr">✦</span>
      <span className="inv-card__corner inv-card__corner--bl">✦</span>
      <span className="inv-card__corner inv-card__corner--br">✦</span>
      <div className="inv-card__body">
        <span className="inv-card__type-badge">{card.type}</span>
        <div className="inv-card__ornament">◆</div>
        <div className="inv-card__names">{card.names}</div>
        <div className="inv-card__divider" />
        <div className="inv-card__detail">{card.detail}</div>
        <div className="inv-card__date">{card.date}</div>
        <div className="inv-card__place">{card.place}</div>
      </div>
    </div>
  )
}

function HeroVisual() {
  const [back, mid, front] = [carouselCards[4], carouselCards[1], carouselCards[0]]

  return (
    <div className="hero__visual" aria-hidden="true">
      <div className="card-stack">
        <div className="stack-card stack-card--back">
          <InvitationCard card={back} />
        </div>
        <div className="stack-card stack-card--mid">
          <InvitationCard card={mid} />
        </div>
        <div className="stack-card stack-card--front">
          <InvitationCard card={front} />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__inner">

        <div className="hero__content">
          <div className="hero__eyebrow">Invitaciones Digitales</div>

          <h1 className="hero__title">
            Comparte tu{' '}
            <em>gran momento</em>
            {' '}con el mundo
          </h1>

          <p className="hero__subtitle">
            Diseños elegantes para bodas, quinceañeras, fiestas y eventos
            corporativos. Crea tu invitación en minutos y compártela al instante.
          </p>

          <div className="hero__ctas">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Plantillas
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Paquetes
            </button>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
