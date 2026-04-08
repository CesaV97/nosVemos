export default function NotFound({ message = 'Página no encontrada' }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'var(--font-body, system-ui)',
      color: 'var(--gray-900, #0E2426)',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{message}</p>
      <a href="/" style={{
        display: 'inline-block',
        padding: '12px 28px',
        background: 'var(--jade, #097C87)',
        color: '#fff',
        borderRadius: '100px',
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}>
        Volver al inicio
      </a>
    </div>
  )
}
