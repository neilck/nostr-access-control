import {getSignature, getEventHash, getPublicKey, Kind} from 'nostr-tools'

/**
 * Returns a NIP-58 Badge Definition event
 * @param props
 * @returns
 */
export function badgeDefinitionEvent(props: {
  d: string
  name: string
  description: string
  image: string
  privateKey: string
}) {
  const {d, name, description, image, privateKey} = props
  let event: any = {
    kind: Kind.BadgeDefinition,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['d', d],
      ['name', name],
      ['description', description],
      ['image', image]
    ],
    content: '',
    pubkey: getPublicKey(privateKey)
  }

  event.id = getEventHash(event)
  event.sig = getSignature(event, privateKey)

  return event
}

/**
 * Returns a NIP-58 badgeAwardEvent
 * @param props
 * @returns
 */
export function badgeAwardEvent(props: {
  badgeDef: string
  awardedPubkey: string
  privateKey: string
}) {
  const {badgeDef, awardedPubkey, privateKey} = props
  let event: any = {
    kind: Kind.BadgeAward,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['a', badgeDef],
      ['p', awardedPubkey]
    ],
    content: '',
    pubkey: getPublicKey(privateKey)
  }

  event.id = getEventHash(event)
  event.sig = getSignature(event, privateKey)
  console.log(JSON.stringify(event))

  return event
}

/**
 * Returns a NIP-99 Classified Listing event
 * @param props
 * @returns
 */
export function classifiedListingEvent(props: {
  d: string
  title: string
  summary: string
  image: string
  badgeDefs: string[]
  badgeDefRelays: string[]
  privateKey: string
}) {
  const {d, title, summary, image, badgeDefs, badgeDefRelays, privateKey} =
    props
  let event: any = {
    kind: 30402,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['d', d],
      ['title', title],
      ['summary', summary],
      ['image', image]
    ],
    content: '',
    pubkey: getPublicKey(privateKey)
  }

  for (let i = 0; i < badgeDefs.length; i++) {
    event.tags.push(['a', badgeDefs[i], badgeDefRelays[i]])
  }

  event.id = getEventHash(event)
  event.sig = getSignature(event, privateKey)

  return event
}
