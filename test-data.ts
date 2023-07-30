import {getPublicKey} from 'nostr-tools'

export const resourceOwnerPrivateKey =
  'd217c1ff2f8a65c3e3a1740db3b9f58b8c848bb45e26d00ed4714e4a0f4ceecf'
export const resourceOwnerPublicKey =
  '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f'
export const badgeIssuerPrivateKey =
  '3dc60aa853c59a01d8d07819a871673cf4636a2306b532aae4490e0eaf78f2ce'
export const badgeIssuerPublicKey =
  '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab'
export const userPrivateKey =
  '4e0ca2defd450550a6cd0cce28fa67a80dc4490c624fc3c12a51dacf437105f8'
export const userPublicKey =
  '50d0791c1a6435c83f498f758d62b9a6785794fcc9df16f833b16b5f0e4265b9'

export const classifiedListingTemplate = {
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

export const badgeDefinitionTemplate = {
  kind: 30009,
  created_at: 1690687928,
  tags: [
    ['d', 'over21'],
    ['name', 'Over 21'],
    ['description', 'User is over 21 years of age.'],
    ['image', 'https://ageverifier.com/images/over21.png']
  ],
  content: '',
  pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab',
  id: 'aef8a294cd6f62476604850a446af8b33c50f1e4072866ca54484764ed0f10f9',
  sig: 'de71f5ccdff86d26bef1b08851d984df2951b55e64e892e71e299fd6b21cce2075a73c4f176ee5963d20fe186008e9251e794e46934f6da041566a2b21019bcb'
}

export const badgeAwardTemplate = {
  kind: 8,
  created_at: 1690687928,
  tags: [
    ['a', '30009:<badge issuer pubkey>:over21'],
    ['p', userPublicKey]
  ],
  content: '',
  pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab',
  id: '329339b68f39dc1528976f3e6eb3742e79324b04231c4ce0da63911ad9bc3708',
  sig: '06ee13d60d8ef148689ddf3c7f67e6626c498a04fa54f0d1440898c7cfc8d099b7376a00582d262790052edc85ad68117c872c57b2c7871c58542484e124333c'
}
