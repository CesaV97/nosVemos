import './DressCode.css'

export default function DressCode({ dressCode }) {
  if (!dressCode) return null

  return (
    <section className="inv-dressCode">
      <h2 className="inv-dressCode__title">{dressCode.label}</h2>
      {dressCode.note && <p className="inv-dressCode__note">{dressCode.note}</p>}
      {dressCode.avoidColors && dressCode.avoidColors.length > 0 && (
        <div className="inv-dressCode__avoid">
          <p className="inv-dressCode__avoid-label">Evitar:</p>
          <p className="inv-dressCode__avoid-colors">{dressCode.avoidColors.join(', ')}</p>
        </div>
      )}
    </section>
  )
}
