import {getPublicKey} from 'nostr-tools'
import {
  badgeDefinitionEvent,
  badgeAwardEvent,
  classifiedListingEvent,
  rawPrivateListingData
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
  classifiedListingNoBadgesTemplate,
  rawPrivateListingDataTemplate
} from '../test/test-data'

test('NIP-58 badge definition', () => {
  const privateKey = badgeIssuerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = badgeDefinitionEvent({
    pubkey: publicKey,
    d: 'over21',
    name: 'Over 21',
    description: 'User is over 21 years of age.',
    image: 'https://ageverifier.com/images/over21.png',
    applyURL: 'https://ageverifier.com/badgeaward'
  })

  console.log(event)

  expect(event.kind).toEqual(badgeDefinitionTemplate.kind)
  expect(event.tags).toEqual(badgeDefinitionTemplate.tags)
  expect(event.content).toEqual(badgeDefinitionTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
})

test('NIP-58 badge award', () => {
  const privateKey = badgeIssuerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = badgeAwardEvent({
    pubkey: publicKey,
    badgeDefRef: `30009:${publicKey}:over21`,
    awardedPubkey: userPublicKey
  })

  console.log(event)

  let aTagValue = ''
  let pTagValue = ''
  const tags = event.tags
  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] == 'a') aTagValue = tags[i][1]
    if (tags[i][0] == 'p') pTagValue = tags[i][1]
  }

  let aTestValue = ''
  let pTestValue = ''
  const testTags = badgeAwardTemplate.tags
  for (let i = 0; i < testTags.length; i++) {
    if (tags[i][0] == 'a') aTestValue = tags[i][1]
    if (tags[i][0] == 'p') pTestValue = tags[i][1]
  }

  expect(event.kind).toEqual(badgeAwardTemplate.kind)
  expect(aTagValue).toEqual(aTestValue)
  expect(pTestValue).toEqual(pTestValue)
  expect(event.content).toEqual(badgeAwardTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
})

test('NIP-58 badge award 2', () => {
  const privateKey = badgeIssuerPrivateKey2
  const publicKey = getPublicKey(privateKey)

  let event = badgeAwardEvent({
    pubkey: publicKey,
    badgeDefRef: `30009:${publicKey}:notabot`,
    awardedPubkey: userPublicKey
  })

  console.log(event)

  let aTagValue = ''
  let pTagValue = ''
  const tags = event.tags
  for (let i = 0; i < tags.length; i++) {
    if (tags[i][0] == 'a') aTagValue = tags[i][1]
    if (tags[i][0] == 'p') pTagValue = tags[i][1]
  }

  let aTestValue = ''
  let pTestValue = ''
  const testTags = badgeAwardTemplate2.tags
  for (let i = 0; i < testTags.length; i++) {
    if (tags[i][0] == 'a') aTestValue = tags[i][1]
    if (tags[i][0] == 'p') pTestValue = tags[i][1]
  }

  expect(event.kind).toEqual(badgeAwardTemplate2.kind)
  expect(aTagValue).toEqual(aTestValue)
  expect(pTestValue).toEqual(pTestValue)
  expect(event.content).toEqual(badgeAwardTemplate2.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
})

test('NIP-99 classified listing', () => {
  const privateKey = resourceOwnerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = classifiedListingEvent({
    pubkey: publicKey,
    d: 'sensitive-content',
    title: 'Sensitive Content',
    summary: 'Sensitive content on Ipsum App',
    image: 'https://ipsum.com/rated-r.png',
    badgeDefRefs: [
      `30009:${badgeIssuerPublicKey}:over21`,
      `30009:${badgeIssuerPublicKey2}:notabot`
    ],
    badgeDefRefsRelays: ['wss://relay', 'wss://relay']
  })

  console.log(event)

  expect(event.kind).toEqual(classifiedListingTemplate.kind)
  expect(event.tags).toEqual(classifiedListingTemplate.tags)
  expect(event.content).toEqual(classifiedListingTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
})

test('NIP-99 classified listing no badges', () => {
  const privateKey = resourceOwnerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = classifiedListingEvent({
    pubkey: publicKey,
    d: 'no-badges',
    title: 'No Badges',
    summary: 'Content not requiring badges',
    image: 'https://ipsum.com/rated-r.png',
    badgeDefRefs: [],
    badgeDefRefsRelays: []
  })

  console.log(event)

  expect(event.kind).toEqual(classifiedListingNoBadgesTemplate.kind)
  expect(event.tags).toEqual(classifiedListingNoBadgesTemplate.tags)
  expect(event.content).toEqual(classifiedListingNoBadgesTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
})

test('raw private listing data', () => {
  const privateKey = resourceOwnerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = rawPrivateListingData(
    {
      pubkey: publicKey,
      clEventRef:
        '30402:6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f:sensitive-content',
      clEventRefRelay: 'wss://relay'
    },
    {
      summary: 'Use the following code at the link below.',
      link: 'https://www.domain.com/private',
      code: 'password'
    }
  )

  console.log(event)

  expect(event.kind).toEqual(rawPrivateListingDataTemplate.kind)
  expect(event.tags).toEqual(rawPrivateListingDataTemplate.tags)
  expect(event.content).toEqual(rawPrivateListingDataTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
})
