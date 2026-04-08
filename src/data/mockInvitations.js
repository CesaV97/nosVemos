/**
 * Mock invitations para Fase 2 testing
 * En Fase 3 estos vienen de Supabase
 */

export const mockInvitations = {
  'demo-boda': {
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
      address: 'Calle Madero 12, Centro Histórico, CDMX 06500',
      time: '17:00 hrs',
      mapsUrl: 'https://maps.google.com/?q=Parroquia+San+Miguel+Arcángel,+CDMX',
    },

    reception: {
      venueName: 'Hacienda San Miguel',
      address: 'Carretera Toluca km 4, San Ángel, Estado de México',
      time: '19:30 hrs',
      mapsUrl: 'https://maps.google.com/?q=Hacienda+San+Miguel',
    },

    dressCode: {
      label: 'Etiqueta',
      note: 'Se sugiere paleta de colores en tonos marfil y dorado. Vestimenta formal.',
      avoidColors: ['Blanco'],
    },

    rsvp: {
      enabled: true,
      contactPhone: '+52 55 1234 5678',
      whatsappMessage: 'Hola, confirmo mi asistencia a la boda de Ana & Carlos. 👰🤵',
      maxGuests: 2,
      formUrl: null,
    },

    gallery: {
      enabled: true,
      photos: [
        { url: 'https://via.placeholder.com/400x300?text=Our+Story', caption: 'Nuestra historia' },
        { url: 'https://via.placeholder.com/400x300?text=Save+the+Date', caption: 'Nuestro viaje' },
      ],
    },

    music: {
      enabled: false,
      trackUrl: null,
      autoplay: false,
    },

    message: {
      text: 'Nos llena de alegría invitarlos a compartir este momento tan especial en nuestras vidas. Esperamos contar con su presencia en nuestro sí, acepte.',
      signoff: 'Con amor,\nAna & Carlos',
    },

    extras: {
      parentsNames: {
        bride: 'María y Roberto García López',
        groom: 'Carmen y Luis Pérez Martínez',
      },
      courtOfHonor: null,
    },
  },

  'demo-quince': {
    id: 'demo-quince',
    templateId: 'quince-rosa',
    eventType: 'quinceanera',
    isPublished: true,
    createdAt: '2026-04-07T00:00:00Z',
    expiresAt: '2026-10-07T00:00:00Z',

    coupleNames: 'Sofía Ramírez García',
    tagline: 'Celebra sus quince años',
    eventDate: '2026-03-22T18:00:00',
    eventDateDisplay: '22 de Marzo de 2026',

    ceremony: null, // Quinceañera no tiene ceremonia tradicional

    reception: {
      venueName: 'Salón Versalles',
      address: 'Avenida Paseo de la Reforma 505, Cuauhtémoc, CDMX',
      time: '18:00 hrs',
      mapsUrl: 'https://maps.google.com/?q=Salón+Versalles,+CDMX',
    },

    dressCode: {
      label: 'Elegante',
      note: 'Paleta de colores en tonos rosados y dorados. Vestimenta de gala.',
      avoidColors: ['Negro'],
    },

    rsvp: {
      enabled: true,
      contactPhone: '+52 55 9876 5432',
      whatsappMessage: 'Confirmo mi asistencia en los quince de Sofía. 💕',
      maxGuests: 1,
      formUrl: null,
    },

    gallery: {
      enabled: true,
      photos: [
        { url: 'https://via.placeholder.com/400x300?text=Sofia+Growing+Up', caption: 'Mi viaje de 15 años' },
        { url: 'https://via.placeholder.com/400x300?text=Family+Moments', caption: 'Momentos con familia' },
      ],
    },

    music: {
      enabled: true,
      trackUrl: 'https://example.com/sofia-waltz.mp3',
      autoplay: false,
    },

    message: {
      text: 'Con la bendición de mis padres y abuelos, os invito a celebrar mis quince años. Será un honor compartir este día especial con todos ustedes.',
      signoff: 'Con amor,\nSofía',
    },

    extras: {
      parentsNames: null,
      courtOfHonor: {
        damas: ['María', 'Alejandra', 'Daniela'],
        chambelanes: ['Luis', 'Diego', 'Santiago'],
      },
    },
  },
}
