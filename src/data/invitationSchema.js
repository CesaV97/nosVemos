/**
 * Invitation Data Schema
 *
 * Documento canónico de la forma de un objeto de invitación.
 * Cada invitación es una fila en la BD (Fase 3: Supabase).
 *
 * @typedef {Object} Invitation
 * @property {string} id - URL slug único: /invite/{id}
 * @property {string} templateId - Mapea a src/templates/index.js (e.g. 'boda-clasica')
 * @property {string} eventType - 'boda' | 'quinceanera' | 'fiesta' | 'corporativo'
 * @property {boolean} isPublished - true = público, false = solo admin
 * @property {string} createdAt - ISO timestamp
 * @property {string} expiresAt - ISO timestamp
 *
 * @property {string} coupleNames - Nombres principales (Ana & Carlos, Sofia, etc.)
 * @property {string} tagline - Subtítulo/lema corto
 * @property {string} eventDate - ISO datetime: '2026-06-15T18:00:00' (para countdown)
 * @property {string} eventDateDisplay - Formato legible: '15 de Junio de 2026'
 *
 * @property {Object|null} ceremony - null si no aplica (fiesta, corporativo)
 * @property {string} ceremony.venueName
 * @property {string} ceremony.address
 * @property {string} ceremony.time - '17:00 hrs'
 * @property {string} ceremony.mapsUrl
 *
 * @property {Object} reception
 * @property {string} reception.venueName
 * @property {string} reception.address
 * @property {string} reception.time - '19:30 hrs'
 * @property {string} reception.mapsUrl
 *
 * @property {Object} dressCode
 * @property {string} dressCode.label - 'Etiqueta', 'Casual', etc.
 * @property {string} dressCode.note - 'Se sugiere paleta marfil y dorado'
 * @property {string[]} dressCode.avoidColors - ['Blanco', 'Rojo']
 *
 * @property {Object} rsvp
 * @property {boolean} rsvp.enabled
 * @property {string} rsvp.contactPhone - '+52 55 1234 5678'
 * @property {string} rsvp.whatsappMessage - Mensaje pre-llenado para WhatsApp
 * @property {number} rsvp.maxGuests - Máximo de acompañantes por respuesta
 * @property {string|null} rsvp.formUrl - Supabase form endpoint (Fase 3)
 *
 * @property {Object} gallery
 * @property {boolean} gallery.enabled
 * @property {Array<{url: string, caption: string}>} gallery.photos
 *
 * @property {Object} music
 * @property {boolean} music.enabled
 * @property {string|null} music.trackUrl
 * @property {boolean} music.autoplay
 *
 * @property {Object} message
 * @property {string} message.text - Mensaje personal largo
 * @property {string} message.signoff - Firma: 'Con amor, Ana & Carlos'
 *
 * @property {Object} extras - Bolsa flexible para campos template-específicos
 * @property {Object|null} extras.parentsNames - Solo Bodas: { bride, groom }
 * @property {Object|null} extras.courtOfHonor - Solo Quinceañera
 */

// Exportar como tipo JSDoc (sin TypeScript)
export const invitationSchemaExample = {
  id: 'demo-boda',
  templateId: 'boda-clasica',
  eventType: 'boda',
  isPublished: true,
  createdAt: '2026-04-07T00:00:00Z',
  expiresAt: '2026-10-07T00:00:00Z',

  coupleNames: 'Ana & Carlos',
  tagline: 'Con la bendición de sus familias',
  eventDate: '2026-06-15T18:00:00',
  eventDateDisplay: '15 de Junio de 2026',

  ceremony: {
    venueName: 'Parroquia de San Miguel Arcángel',
    address: 'Calle Madero 12, Centro Histórico, CDMX',
    time: '17:00 hrs',
    mapsUrl: 'https://maps.google.com/?q=Parroquia+San+Miguel+Arcángel',
  },

  reception: {
    venueName: 'Hacienda San Miguel',
    address: 'Carretera Toluca km 4, Estado de México',
    time: '19:30 hrs',
    mapsUrl: 'https://maps.google.com/?q=Hacienda+San+Miguel',
  },

  dressCode: {
    label: 'Etiqueta',
    note: 'Se sugiere paleta de colores en tonos marfil y dorado.',
    avoidColors: ['Blanco', 'Rojo'],
  },

  rsvp: {
    enabled: true,
    contactPhone: '+52 55 1234 5678',
    whatsappMessage: 'Hola, confirmo mi asistencia a la boda de Ana & Carlos.',
    maxGuests: 2,
    formUrl: null,
  },

  gallery: {
    enabled: true,
    photos: [
      { url: 'https://example.com/photo1.jpg', caption: 'Nuestra historia' },
    ],
  },

  music: {
    enabled: false,
    trackUrl: null,
    autoplay: false,
  },

  message: {
    text: 'Nos llena de alegría invitarlos a compartir este momento tan especial en nuestras vidas.',
    signoff: 'Con amor, Ana & Carlos',
  },

  extras: {
    parentsNames: {
      bride: 'María y Roberto García',
      groom: 'Carmen y Luis Pérez',
    },
    courtOfHonor: null,
  },
}
