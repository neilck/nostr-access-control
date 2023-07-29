import {
  Kind,
  UnsignedEvent,
  Event,
  validateEvent,
  verifySignature,
  getSignature,
  getEventHash,
  getPublicKey
} from 'nostr-tools'

export function classifiedListing(
  d: string,
  title: string,
  summary: string,
  image: string,
  badgeDefs: string[],
  badgeDefRelays: string[],
  privateKey: string
) {
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

  console.log(JSON.stringify(event))
  event.id = getEventHash(event)
  event.sig = getSignature(event, privateKey)

  return event
}
