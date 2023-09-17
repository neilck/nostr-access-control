import {
  getSignature,
  getEventHash,
  getPublicKey,
  Kind,
  UnsignedEvent
} from 'nostr-tools'

/**
 * Returns a NIP-58 Badge Definition event
 * @param props properties for the new event
 * @param props.pubkey - pubkey of badge owner
 * @param props.d - parameterized replaceable event descriptor
 * @param props.name - badge name
 * @param props.description - badge description
 * @param props.image - badge image url
 * @returns  - unsigned nostr event
 */
export function badgeDefinitionEvent(props: {
  pubkey: string
  d: string
  name: string
  description: string
  image: string
}): UnsignedEvent<Kind.BadgeDefinition> {
  const {pubkey, d, name, description, image} = props
  const event: UnsignedEvent<Kind.BadgeDefinition> = {
    pubkey: pubkey,
    kind: Kind.BadgeDefinition,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['d', d],
      ['name', name],
      ['description', description],
      ['image', image]
    ],
    content: ''
  }

  return event
}

/**
 * Returns a NIP-58 badgeAwardEvent
 * @param props
 * @param props.pubkey - pubkey of classified listing owner
 * @param props.badgeDefRef - reference to badge being awarded
 * @param props.badgeDefRefRelay - optional recommended relay for badgeDefRef
 * @param props.awardedPubkey - pubkey of user badge is being awarded to
 * @returns  - unsigned nostr event
 */
export function badgeAwardEvent(props: {
  pubkey: string
  badgeDefRef: string
  badgeDefRefRelay?: string
  awardedPubkey: string
}): UnsignedEvent<Kind.BadgeAward> {
  const {pubkey, badgeDefRef, badgeDefRefRelay, awardedPubkey} = props
  let event: UnsignedEvent<Kind.BadgeAward> = {
    pubkey: pubkey,
    kind: Kind.BadgeAward,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['p', awardedPubkey]],
    content: ''
  }

  if (badgeDefRefRelay) event.tags.push(['a', badgeDefRef, badgeDefRefRelay])
  else event.tags.push(['a', badgeDefRef])

  return event
}

/**
 * Returns an exclusive as a NIP-99 Classified Listing event
 * @param props - properties for the new event
 * @param props.pubkey - pubkey of classified listing owner
 * @param props.d - parameterized replaceable event descriptor
 * @param props.title -  title of exclusive
 * @param props.summary - description of exclusive
 * @param props.badgeDefs -  references to badges a user must have been awarded to access exclusive e.g. "30009:<pubkey>:bravery"
 * @param props.badgeDefRelays -  optional recommended relays for badges, in same order as badges
 * @returns  - unsigned nostr event
 */
export function classifiedListingEvent(props: {
  pubkey: string
  d: string
  title: string
  summary: string
  image: string
  badgeDefRefs: string[]
  badgeDefRefsRelays?: string[]
}): UnsignedEvent<30402> {
  const {pubkey, d, title, summary, image, badgeDefRefs, badgeDefRefsRelays} =
    props
  const event: UnsignedEvent<30402> = {
    pubkey: pubkey,
    kind: 30402,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['d', d],
      ['title', title],
      ['summary', summary],
      ['image', image]
    ],
    content: ''
  }

  for (let i = 0; i < badgeDefRefs.length; i++) {
    if (badgeDefRefsRelays && badgeDefRefsRelays.length > i) {
      event.tags.push(['a', badgeDefRefs[i], badgeDefRefsRelays[i]])
    } else {
      event.tags.push(['a', badgeDefRefs[i]])
    }
  }

  return event
}

/**
 * Returns an event to store private data, to be saved as encrypted content
 * @param props - properties for the new event
 * @param props.pubkey - pubkey of classified listing owner
 * @param props.clEventRef - refers to associated classified listing event
 * @param props.clEventRefRelay - relay for clEventRef
 * @param content - private content
 * @param content.summary - access instructions
 * @param content.link -  link to exclusive data
 * @param content.code - code/password to use link
 * @returns - unsigned nostr event
 */
export function rawPrivateListingData(
  props: {
    pubkey: string
    clEventRef: string
    clEventRefRelay?: string
  },
  content: {
    summary: string
    link?: string
    code?: string
  }
): UnsignedEvent<30078> {
  const {pubkey, clEventRef, clEventRefRelay} = props
  const event: UnsignedEvent<30078> = {
    pubkey: pubkey,
    kind: 30078,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['d', 'aka:classifiedListing']],
    content: JSON.stringify(content)
  }

  if (clEventRefRelay) event.tags.push(['a', clEventRef, clEventRefRelay])
  else event.tags.push(['a', clEventRef])

  return event
}
