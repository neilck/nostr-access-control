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
    ['applyURL', 'https://ageverifier.com/badgeaward'],
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

export const badgeAttestationTemplate = {
  pubkey: '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f',
  kind: 1,
  created_at: 1700214717,
  tags: [
    ['e', 'a7cec1d55d4bab053eee34583eab67e61abebefdac122ca6f24a7d60db2d7423'],
    [
      'a',
      '30009:0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab:bravery'
    ],
    ['client', 'akaprofiles']
  ],
  content:
    'Attestation for badge definition event (Medal of Bravery). Signed on Fri, 17 Nov 2023 09:51:57 GMT',
  id: 'e1fe7a5a02f3de2d616c52faa55b4953d52354d086d4ca604f79be0ea47f696f',
  sig: '74a2aa4d99c79c2cfafd97b5de556c5bc9a5c388b8add1de16f6b8b331a3a7dfdbf19ab58a6a1821b4f0121c08c79fc96c2ec252998ad5f96846ba62b98432a3'
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

export const awardAttestationTemplate = {
  pubkey: '6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f',
  kind: 1,
  created_at: 1700215667,
  tags: [
    ['e', '2ad287584ed58590083a78638be5d57251d5cb3c86e4e940811f4a9f6ccc365f'],
    ['client', 'akaprofiles']
  ],
  content:
    'Attestation for badge award event. Signed on Fri, 17 Nov 2023 10:07:47 GMT',
  id: '76e1df7c86eb4bf953bca9f5d73f87abe5f95aa349d12e68323c05d86056e433',
  sig: '3106fd6cd7df94c8439b7aeddb355ce1ed9a2b6c5788c210eca9a734dacbb357fba3be56b74fc0e7df8f01fcbbfdee7d9439840cd74555e1db4af52b7cd5bef5'
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

export const listingAttestationTemplate = {
  pubkey: '0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab',
  kind: 1,
  created_at: 1700215866,
  tags: [
    ['e', 'd1f398c68efedd60f7eb00d5aa9b1d736b296f2303fcc1e6707786f48d7fdb35'],
    [
      'a',
      '30402:6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f:lorem-ipsum'
    ],
    ['client', 'akaprofiles']
  ],
  content:
    'Attestation for classified listing event (Lorem Ipsum). Signed on Fri, 17 Nov 2023 10:11:06 GMT',
  id: '64498e68e44e01809f3f06fbdc0d65d9a69a7e0d03d79a3c5adadd4176d86b7f',
  sig: 'd0e06ea2830ff8c48b8a7e84322dbdd967d773108d4be56f55ddd9ad1c86bd66c2f1bf934b2258e639904e7955dc3e5d8d9ff01ab98944477ad6c8a20e150492'
}
