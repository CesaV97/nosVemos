import './elegancia-clasica.css'
import InvitationHero from '../../components/invitation-sections/InvitationHero'
import Countdown from '../../components/invitation-sections/Countdown'
import MessageSection from '../../components/invitation-sections/MessageSection'
import SectionDivider from '../../components/invitation-sections/SectionDivider'
import CeremonyInfo from '../../components/invitation-sections/CeremonyInfo'
import ReceptionInfo from '../../components/invitation-sections/ReceptionInfo'
import DressCode from '../../components/invitation-sections/DressCode'
import GallerySection from '../../components/invitation-sections/GallerySection'
import RSVPSection from '../../components/invitation-sections/RSVPSection'

export default function EleganciaClasica({ invitation, includedComponents }) {
  if (!invitation) return null

  // If no filter is provided, show all sections (backwards compatible)
  const shows = (key) => !includedComponents || includedComponents.includes(key)

  return (
    <div data-template="boda-clasica">
      {shows('hero') && (
        <InvitationHero
          coupleNames={invitation.coupleNames}
          tagline={invitation.tagline}
          eventDateDisplay={invitation.eventDateDisplay}
        />
      )}

      {shows('countdown') && <Countdown eventDate={invitation.eventDate} />}

      {shows('message') && (
        <>
          <SectionDivider />
          <MessageSection message={invitation.message} />
        </>
      )}

      {shows('ceremony') && (
        <>
          <SectionDivider />
          <CeremonyInfo ceremony={invitation.ceremony} />
        </>
      )}

      {shows('reception') && <ReceptionInfo reception={invitation.reception} />}

      {shows('dresscode') && (
        <>
          <SectionDivider />
          <DressCode dressCode={invitation.dressCode} />
        </>
      )}

      {shows('gallery') && (
        <>
          <SectionDivider />
          <GallerySection gallery={invitation.gallery} />
        </>
      )}

      {shows('rsvp') && (
        <>
          <SectionDivider />
          <RSVPSection rsvp={invitation.rsvp} />
        </>
      )}
    </div>
  )
}
