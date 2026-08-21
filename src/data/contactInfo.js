/**
 * Información de contacto de nosVemos.
 * Editar SOLO este archivo para actualizar los datos en toda la app
 * (sección Contacto, Footer, botones de WhatsApp).
 */

// Celular en formato internacional sin espacios ni símbolos (52 = México)
const PHONE_E164 = '5215512345678'

export const contactInfo = {
  phone: {
    // Lo que ve el usuario
    display: '+52 55 1234 5678',
    // Link tel:
    href: `tel:+${PHONE_E164}`,
  },
  whatsapp: {
    display: '+52 55 1234 5678',
    // Mensaje precargado al abrir el chat
    href: `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
      'Hola nosVemos, me interesa una invitación digital.'
    )}`,
  },
  email: {
    display: 'hola@nosvemos.mx',
    href: 'mailto:hola@nosvemos.mx',
  },
  instagram: {
    display: '@nosvemos',
    href: 'https://instagram.com/nosvemos',
  },
  facebook: {
    display: 'nosVemos',
    href: 'https://facebook.com/nosvemos',
  },
}

export default contactInfo
