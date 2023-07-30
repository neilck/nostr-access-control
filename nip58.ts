import {getSignature, getEventHash, getPublicKey, Kind} from 'nostr-tools'

/**
 * Returns a Badge Definition event
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
  console.log(JSON.stringify(event))

  return event
}

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
