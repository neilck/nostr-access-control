export const badgeDefinitionTemplate = {
  pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab',
  kind: 30009,
  created_at: 1698472498,
  tags: [
    ['d', 'bravery'],
    ['name', 'Medal of Bravery'],
    ['description', 'Awarded to users demonstrating bravery'],
    ['image', 'https://nostr.academy/awards/bravery.png'],
    ['thumb', 'https://nostr.academy/awards/bravery_258x256.png'],
    ['client', 'akaprofiles'],
    [
      'a',
      '30009:3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0:badge1'
    ],
    [
      'a',
      '30009:3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0:badge2',
      'wss://relay.pancakes.io'
    ],
    ['unknown', 'unknown tag']
  ],
  content: '',
  id: 'f43f0e03e9eca2e42d739abbba4e43277bab19e25688e549eae52bcefff1913a',
  sig: 'b8dfb33da65dfffb48af4a38c2f9f85a4404a32579da8844bfc0a7f9ff4345caa43f54c38a101f35100b31354799f0de9a8d7e179e1d5f9713039e4d1118f16a'
}

export const badgeAwardTemplate = {
  kind: 8,
  pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab',
  created_at: 1698490836,
  tags: [
    [
      'a',
      '30009:0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab:bravery'
    ],
    ['client', 'akaprofiles'],
    ['p', '50d0791c1a6435c83f498f758d62b9a6785794fcc9df16f833b16b5f0e4265b9'],
    [
      'p',
      '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f',
      'wss://relay.pancakes.io'
    ],
    ['unknown', 'unknown tag']
  ],
  content: '',
  id: 'bacc023c2f2dd72dc96b24328056d7568ff6f8973588bfc32b1690e96536087d',
  sig: 'dc44c10e89c64cc526743580705b88574a49ef9888443fb2a8a5a7433fc56acc6d63aee3dd57743a58a3aaab08e8b3b2431332e58cdbb4f3f9f0ba91222f9f1a'
}

export const classifiedListingTemplate = {
  pubkey: '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f',
  kind: 30402,
  created_at: 1698493206,
  tags: [
    ['d', 'lorem-ipsum'],
    ['title', 'Lorem Ipsum'],
    ['summary', 'More lorem ipsum that is a little more than the title'],
    ['image', 'https://url.to.img'],
    ['thunb', 'https://url.to_128x128.img'],
    ['client', 'akaprofiles'],
    ['published_at', '1296962229'],
    [
      'a',
      '30009:3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0:badge1'
    ],
    [
      'a',
      '30009:3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0:badge2',
      'wss://relay.pancakes.io'
    ],
    ['unknown', 'unknown tag']
  ],
  content:
    'Lorem [ipsum][nostr:nevent1qqst8cujky046negxgwwm5ynqwn53t8aqjr6afd8g59nfqwxpdhylpcpzamhxue69uhhyetvv9ujuetcv9khqmr99e3k7mg8arnc9] dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n' +
    '\n' +
    'Read more at nostr:naddr1qqzkjurnw4ksz9thwden5te0wfjkccte9ehx7um5wghx7un8qgs2d90kkcq3nk2jry62dyf50k0h36rhpdtd594my40w9pkal876jxgrqsqqqa28pccpzu.',
  id: '7b485b862ccbef59ee08c402ee1ff3c7f3786ee80c00945b47d57c42f3e4c1e8',
  sig: '2e718fe0cb2896593a5bd736082c7baf0a3f25a7fca25af668e71bb6d0cf2e292a5a7860ed07bc202ebc389b82fc559390253a9c397020bc7bbe18f101805d4d'
}
