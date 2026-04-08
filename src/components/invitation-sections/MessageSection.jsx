import './MessageSection.css'

export default function MessageSection({ message }) {
  if (!message) return null

  return (
    <section className="inv-message">
      <p className="inv-message__text">{message.text}</p>
      {message.signoff && <p className="inv-message__signoff">{message.signoff}</p>}
    </section>
  )
}
