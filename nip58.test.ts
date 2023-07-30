import {getPublicKey} from 'nostr-tools'
import {badgeDefinitionEvent, badgeAwardEvent} from './nip58'
import {badgeIssuerPrivateKey, userPublicKey} from './test-data'

test('create badge definition event', () => {
  const privateKey = badgeIssuerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = badgeDefinitionEvent({
    d: 'over21',
    name: 'Over 21',
    description: 'User is over 21 years of age.',
    image: 'https://ageverifier.com/images/over21.png',
    privateKey
  })

  const template = {
    kind: 30009,
    created_at: 1690687928,
    tags: [
      ['d', 'over21'],
      ['name', 'Over 21'],
      ['description', 'User is over 21 years of age.'],
      ['image', 'https://ageverifier.com/images/over21.png']
    ],
    content: '',
    pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab'
  }

  expect(event.kind).toEqual(template.kind)
  expect(event.tags).toEqual(template.tags)
  expect(event.content).toEqual(template.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})

test('create badge award event', () => {
  const privateKey = badgeIssuerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = badgeAwardEvent({
    badgeDef: '30009:<badge issuer pubkey>:over21',
    awardedPubkey: userPublicKey,
    privateKey
  })

  console.log(event)

  const template = {
    kind: 8,
    created_at: 1690687928,
    tags: [
      ['a', '30009:<badge issuer pubkey>:over21'],
      ['p', userPublicKey]
    ],
    content: '',
    pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab'
  }

  expect(event.kind).toEqual(template.kind)
  expect(event.tags).toEqual(template.tags)
  expect(event.content).toEqual(template.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})
