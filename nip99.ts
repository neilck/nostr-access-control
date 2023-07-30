import {getSignature, getEventHash, getPublicKey} from 'nostr-tools'

/**
 * Returns a Classified Listing event
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
