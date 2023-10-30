import {getPublicKey} from 'nostr-tools'

export const resourceOwnerPrivateKey =
  'd217c1ff2f8a65c3e3a1740db3b9f58b8c848bb45e26d00ed4714e4a0f4ceecf'
export const resourceOwnerPublicKey =
  '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f'
export const badgeIssuerPrivateKey =
  '3dc60aa853c59a01d8d07819a871673cf4636a2306b532aae4490e0eaf78f2ce'
export const badgeIssuerPublicKey =
  '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab'
export const badgeIssuerPrivateKey2 =
  'b9448e1a9756718b30c68d45b8761ac2c74c59e206d471630eb483db7cfd97dc'
export const badgeIssuerPublicKey2 =
  '3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0'
export const userPrivateKey =
  '4e0ca2defd450550a6cd0cce28fa67a80dc4490c624fc3c12a51dacf437105f8'
export const userPublicKey =
  '50d0791c1a6435c83f498f758d62b9a6785794fcc9df16f833b16b5f0e4265b9'

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
  pubkey: badgeIssuerPublicKey,
  id: 'aef8a294cd6f62476604850a446af8b33c50f1e4072866ca54484764ed0f10f9',
  sig: 'de71f5ccdff86d26bef1b08851d984df2951b55e64e892e71e299fd6b21cce2075a73c4f176ee5963d20fe186008e9251e794e46934f6da041566a2b21019bcb'
}

export const badgeAwardTemplate = {
  kind: 8,
  created_at: 1691673976,
  tags: [
    ['a', `30009:${badgeIssuerPublicKey}:over21`],
    ['p', userPublicKey]
  ],
  content: '',
  pubkey: badgeIssuerPublicKey,
  id: '8655570ce8a4ffde62034f562df4c6d5a0bdf95dbaaed4728294920ec4a8ccac',
  sig: '63e4088d4c871159122492a3b43664130669e5149978c2d382a612f102be3cafa97e31526b0f7d8635a35a7c819b394721fc7942bd7ecb9082f2946ed411b353'
}

export const badgeAwardTemplate2 = {
  kind: 8,
  created_at: 1691692374,
  tags: [
    ['a', `30009:${badgeIssuerPublicKey2}:notabot`],
    ['p', userPublicKey]
  ],
  content: '',
  pubkey: badgeIssuerPublicKey2,
  id: '8ddc0e944b25cbfe404d5bc48d4b9b41c152af89401c6369a40904b19a756b7d',
  sig: '67054755e7f47d6c0964e5a7687688d202ff25c3a94e5e1dba39fdf533d02677a4d8baa6c5dd45c162619ec565349af2baf24137bb59be7e67f11a3f9a06bd3e'
}

export const classifiedListingTemplate = {
  content: '',
  created_at: 1691692706,
  id: '44014f31f3f34bc15d93e71323bd006aea2b1b8b44704d78bd2c8b610c9a7b59',
  kind: 30402,
  pubkey: resourceOwnerPublicKey,
  sig: 'a0a1ddc09e52b266def4952737e8a410b2da26909556af1979616f3c020d393a922c5ff3de9bd29ca74e26180e743b42dd55eb2a09b845355f1779887ffb4d9c',
  tags: [
    ['d', 'sensitive-content'],
    ['title', 'Sensitive Content'],
    ['summary', 'Sensitive content on Ipsum App'],
    ['image', 'https://ipsum.com/rated-r.png'],
    ['a', `30009:${badgeIssuerPublicKey}:over21`, 'wss://relay'],
    ['a', `30009:${badgeIssuerPublicKey2}:notabot`, 'wss://relay']
  ]
}

export const classifiedListingNoBadgesTemplate = {
  kind: 30402,
  created_at: 1691700868,
  tags: [
    ['d', 'no-badges'],
    ['title', 'No Badges'],
    ['summary', 'Content not requiring badges'],
    ['image', 'https://ipsum.com/rated-r.png']
  ],
  content: '',
  pubkey: resourceOwnerPublicKey,
  id: '04f7c76aee46e9936ecf98804ada3a54ccfe580b63cc646e7aca8be913d2b62b',
  sig: '1be8cc1f1423fcb62a001536ac69f7e1caa4bbd03b65a6d92c49d8d0cae8d6381c1e0472148744be3b62a53d3a99a3c2742dd1ef5420c80782fc6fa6c4aab6d4'
}

export const rawPrivateListingDataTemplate = {
  pubkey: '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f',
  kind: 30078,
  created_at: 1694949513,
  tags: [
    ['d', 'aka:classifiedListing'],
    [
      'a',
      '30402:6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f:sensitive-content',
      'wss://relay'
    ]
  ],
  content:
    '{"summary":"Use the following code at the link below.","link":"https://www.domain.com/private","code":"password"}'
}
