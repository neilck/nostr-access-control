import {getPublicKey} from 'nostr-tools'
import {
  badgeDefinitionEvent,
  badgeAwardEvent,
  classifiedListingEvent
} from './createEvent'
import {
  badgeIssuerPrivateKey,
  badgeIssuerPrivateKey2,
  badgeIssuerPublicKey,
  badgeIssuerPublicKey2,
  resourceOwnerPrivateKey,
  userPublicKey,
  badgeAwardTemplate,
  badgeAwardTemplate2,
  badgeDefinitionTemplate,
  classifiedListingTemplate,
  classifiedListingNoBadgesTemplate
} from './test-data'

test('NIP-58 badge definition', () => {
  const privateKey = badgeIssuerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = badgeDefinitionEvent({
    d: 'over21',
    name: 'Over 21',
    description: 'User is over 21 years of age.',
    image: 'https://ageverifier.com/images/over21.png',
    privateKey
  })

  expect(event.kind).toEqual(badgeDefinitionTemplate.kind)
  expect(event.tags).toEqual(badgeDefinitionTemplate.tags)
  expect(event.content).toEqual(badgeDefinitionTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})

test('NIP-58 badge award', () => {
  const privateKey = badgeIssuerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = badgeAwardEvent({
    badgeDef: `30009:${publicKey}:over21`,
    awardedPubkey: userPublicKey,
    privateKey
  })

  console.log(event)

  expect(event.kind).toEqual(badgeAwardTemplate.kind)
  expect(event.tags).toEqual(badgeAwardTemplate.tags)
  expect(event.content).toEqual(badgeAwardTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})

test('NIP-58 badge award 2', () => {
  const privateKey = badgeIssuerPrivateKey2
  const publicKey = getPublicKey(privateKey)

  let event = badgeAwardEvent({
    badgeDef: `30009:${publicKey}:notabot`,
    awardedPubkey: userPublicKey,
    privateKey
  })

  console.log(event)

  expect(event.kind).toEqual(badgeAwardTemplate2.kind)
  expect(event.tags).toEqual(badgeAwardTemplate2.tags)
  expect(event.content).toEqual(badgeAwardTemplate2.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})

test('NIP-99 classified listing', () => {
  const privateKey = resourceOwnerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = classifiedListingEvent({
    d: 'sensitive-content',
    title: 'Sensitive Content',
    summary: 'Sensitive content on Ipsum App',
    image: 'https://ipsum.com/rated-r.png',
    badgeDefs: [
      `30009:${badgeIssuerPublicKey}:over21`,
      `30009:${badgeIssuerPublicKey2}:notabot`
    ],
    badgeDefRelays: ['wss://relay', 'wss://relay'],
    privateKey
  })

  console.log(event)

  expect(event.kind).toEqual(classifiedListingTemplate.kind)
  expect(event.tags).toEqual(classifiedListingTemplate.tags)
  expect(event.content).toEqual(classifiedListingTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})

test('NIP-99 classified listing no badges', () => {
  const privateKey = resourceOwnerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = classifiedListingEvent({
    d: 'no-badges',
    title: 'No Badges',
    summary: 'Content not requiring badges',
    image: 'https://ipsum.com/rated-r.png',
    badgeDefs: [],
    badgeDefRelays: [],
    privateKey
  })

  console.log(event)

  expect(event.kind).toEqual(classifiedListingNoBadgesTemplate.kind)
  expect(event.tags).toEqual(classifiedListingNoBadgesTemplate.tags)
  expect(event.content).toEqual(classifiedListingNoBadgesTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})
