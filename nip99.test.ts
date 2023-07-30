import {getPublicKey} from 'nostr-tools'
import {classifiedListingEvent} from './nip99'
import {resourceOwnerPrivateKey} from './test-data'

test('create classified listing event', () => {
  const privateKey = resourceOwnerPrivateKey
  const publicKey = getPublicKey(privateKey)

  let event = classifiedListingEvent({
    d: 'sensitive-content',
    title: 'Sensitive Content',
    summary: 'Sensitive content on Ipsum App',
    image: 'https://ipsum.com/rated-r.png',
    badgeDefs: [
      '30009:<badge issuer pubkey>:over21',
      '30009:<badge issuer pubkey>:notabot'
    ],
    badgeDefRelays: ['wss://relay', 'wss://relay'],
    privateKey
  })

  const template = {
    content: '',
    created_at: 1690633625,
    id: '0afd4ec7cc6edfa5af2e9ae7ae700797ef5424c511542b87c566980982985109',
    kind: 30402,
    pubkey: '927a929aa0d4fbc72b9d3286260282828d0e8ba2d879a2851a0212da927eeb67',
    sig: '76b11027c9ce13f26afad72617ba549ad29fad9e6f1edc7f5b66e20d4aeca7d365ee64324b14e720f0ba3ac0f6324bc8f802d3a56db1eed53a8a47af9ff6590b',
    tags: [
      ['d', 'sensitive-content'],
      ['title', 'Sensitive Content'],
      ['summary', 'Sensitive content on Ipsum App'],
      ['image', 'https://ipsum.com/rated-r.png'],
      ['a', '30009:<badge issuer pubkey>:over21', 'wss://relay'],
      ['a', '30009:<badge issuer pubkey>:notabot', 'wss://relay']
    ]
  }

  expect(event.kind).toEqual(template.kind)
  expect(event.tags).toEqual(template.tags)
  expect(event.content).toEqual(template.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(publicKey)
  expect(typeof event.id).toEqual('string')
  expect(typeof event.sig).toEqual('string')
})
