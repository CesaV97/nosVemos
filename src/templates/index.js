import { createElement } from 'react'
import InvitationLayout from './InvitationLayout/InvitationLayout'

const TEMPLATE_IDS = [
  'boda-clasica',
  'boda-bohemio',
  'boda-moderna',
  'quince-rosa',
  'quince-gold',
  'quince-jardin',
  'fiesta',
  'fiesta-jardin',
  'corporativo',
  'corporativo-moderno',
]

/**
 * Wraps InvitationLayout pre-binding the templateId so each registry
 * entry behaves like a standalone template component.
 */
function makeThemedTemplate(templateId) {
  const Themed = (props) => createElement(InvitationLayout, { ...props, templateId })
  Themed.displayName = `Template(${templateId})`
  return Themed
}

export const TEMPLATE_REGISTRY = TEMPLATE_IDS.reduce((acc, id) => {
  acc[id] = makeThemedTemplate(id)
  return acc
}, {})

export function getTemplate(templateId) {
  return TEMPLATE_REGISTRY[templateId] || null
}
