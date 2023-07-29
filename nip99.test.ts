import {getPublicKey} from 'nostr-tools'
import {classifiedListing} from './nip99'

test('create classified listing event', () => {
  // d: string,
  // title: string,
  // summary: string,
  // image: string,
  // a: string,
  // privateKey: string
  const privateKey =
    'd217c1ff2f8a65c3e3a1740db3b9f58b8c848bb45e26d00ed4714e4a0f4ceecf'
  const publicKey = getPublicKey(privateKey)

  let event = classifiedListing(
    'sensitive-content',
    'Sensitive Content',
    'Sensitive content on Ipsum App',
    'https://ipsum.com/rated-r.png',
    [
      '30009:<badge issuer pubkey>:over21',
      '30009:<badge issuer pubkey>:notabot'
    ],
    ['wss://relay', 'wss://relay'],
    privateKey
  )

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
