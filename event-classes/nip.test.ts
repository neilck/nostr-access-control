import {
  BadgeType,
  BadgeDefinitionProps,
  BadgeDefinition,
  BadgeAwardProps,
  BadgeAward
} from './nip58'
import {ListingType, ClassifiedListingProps, ClassifiedListing} from './nip99'
import {AttestationProps, Attestation} from './attestationEvent'
import {
  badgeIssuerPublicKey,
  badgeIssuerPrivateKey,
  badgeIssuerPublicKey2,
  userPublicKey,
  resourceOwnerPublicKey,
  resourceOwnerPrivateKey
} from '../test/test-data'
import {
  badgeDefinitionTemplate,
  badgeAwardTemplate,
  classifiedListingTemplate,
  badgeAttestationTemplate,
  awardAttestationTemplate,
  listingAttestationTemplate
} from './nip.test-data'
import exp from 'constants'

test('badgedefinition', () => {
  const props: BadgeDefinitionProps = {
    identifier: 'bravery',
    name: 'Medal of Bravery',
    description: 'Awarded to users demonstrating bravery',
    image: 'https://nostr.academy/awards/bravery.png',
    thumbnail: 'https://nostr.academy/awards/bravery_258x256.png',
    type: BadgeType.Badge,
    applyURL: 'https://ageverifier.com/badgeaward'
  }
  const badge = new BadgeDefinition(props)
  badge.client = 'akaprofiles'

  badge.addRequiredBadge(`30009:${badgeIssuerPublicKey2}:badge1`)
  badge.addRequiredBadge(
    `30009:${badgeIssuerPublicKey2}:badge2`,
    'wss://relay.pancakes.io'
  )
  badge.addOtherTag(['unknown', 'unknown tag'])

  const event = badge.toSignedEvent(badgeIssuerPrivateKey)

  console.log(JSON.stringify(event))

  expect(event.kind).toEqual(badgeDefinitionTemplate.kind)
  expect(event.tags).toEqual(badgeDefinitionTemplate.tags)
  expect(event.content).toEqual(badgeDefinitionTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(badgeIssuerPublicKey)

  const identifier = badge.getPREIdentifier()
  expect(identifier).toEqual(
    '30009:0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab:bravery'
  )

  const attestation = new Attestation({referencedEvent: event})
  const signedEvent = attestation.toSignedEvent(resourceOwnerPrivateKey)

  expect(signedEvent.kind).toEqual(badgeAttestationTemplate.kind)
  signedEvent.tags.forEach(tag => {
    if (tag.length > 1) {
      switch (tag[0]) {
        case 'e':
          expect(tag[1]).toEqual(event.id)
          break
        case 'a':
          expect(tag[1]).toEqual(identifier)
          break
      }
    }
  })
  expect(signedEvent.content).toContain(
    'Attestation for badge definition event (Medal of Bravery).'
  )
  expect(typeof signedEvent.created_at).toEqual('number')
  expect(signedEvent.pubkey).toEqual(resourceOwnerPublicKey)
})

test('badgeaward', () => {
  const props: BadgeAwardProps = {
    awardedBadge:
      '30009:0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab:bravery',
    awardeePubkey: userPublicKey
  }
  const badgeAward = new BadgeAward(props)
  badgeAward.client = 'akaprofiles'

  badgeAward.addAwardee(resourceOwnerPublicKey, 'wss://relay.pancakes.io')
  badgeAward.addOtherTag(['unknown', 'unknown tag'])

  const event = badgeAward.toSignedEvent(resourceOwnerPrivateKey)

  expect(event.kind).toEqual(badgeAwardTemplate.kind)
  expect(event.tags).toEqual(badgeAwardTemplate.tags)
  expect(event.content).toEqual(badgeAwardTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(resourceOwnerPublicKey)

  const attestation = new Attestation({referencedEvent: event})
  const signedEvent = attestation.toSignedEvent(resourceOwnerPrivateKey)

  expect(signedEvent.kind).toEqual(awardAttestationTemplate.kind)
  signedEvent.tags.forEach(tag => {
    if (tag.length > 1) {
      switch (tag[0]) {
        case 'e':
          expect(tag[1]).toEqual(event.id)
          break
      }
    }
  })
  expect(signedEvent.content).toContain('Attestation for badge award event.')
  expect(typeof signedEvent.created_at).toEqual('number')
  expect(signedEvent.pubkey).toEqual(resourceOwnerPublicKey)
})

test('classifiedlisting', () => {
  const props: ClassifiedListingProps = {
    identifier: 'lorem-ipsum',
    title: 'Lorem Ipsum',
    summary: 'More lorem ipsum that is a little more than the title',
    image: 'https://url.to.img',
    thumbnail: 'https://url.to_128x128.img',
    type: ListingType.Offer,
    content:
      'Lorem [ipsum][nostr:nevent1qqst8cujky046negxgwwm5ynqwn53t8aqjr6afd8g59nfqwxpdhylpcpzamhxue69uhhyetvv9ujuetcv9khqmr99e3k7mg8arnc9] dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nRead more at nostr:naddr1qqzkjurnw4ksz9thwden5te0wfjkccte9ehx7um5wghx7un8qgs2d90kkcq3nk2jry62dyf50k0h36rhpdtd594my40w9pkal876jxgrqsqqqa28pccpzu.',
    published_at: 1296962229
  }

  const classifiedListing = new ClassifiedListing(props)
  classifiedListing.client = 'akaprofiles'

  classifiedListing.addRequiredBadge(`30009:${badgeIssuerPublicKey2}:badge1`)
  classifiedListing.addRequiredBadge(
    `30009:${badgeIssuerPublicKey2}:badge2`,
    'wss://relay.pancakes.io'
  )
  classifiedListing.addOtherTag(['unknown', 'unknown tag'])

  const event = classifiedListing.toSignedEvent(resourceOwnerPrivateKey)

  console.log(JSON.stringify(event))

  expect(event.kind).toEqual(classifiedListingTemplate.kind)
  expect(event.tags).toEqual(classifiedListingTemplate.tags)
  expect(event.content).toEqual(classifiedListingTemplate.content)
  expect(typeof event.created_at).toEqual('number')
  expect(event.pubkey).toEqual(resourceOwnerPublicKey)

  const identifier = classifiedListing.getPREIdentifier()
  expect(identifier).toEqual(
    '30402:6af0f9de588f2c53cedcba26c5e2402e0d0aa64ec7b47c9f8d97b5bc562bab5f:lorem-ipsum'
  )

  const attestation = new Attestation({referencedEvent: event})
  const signedEvent = attestation.toSignedEvent(badgeIssuerPrivateKey)

  expect(signedEvent.kind).toEqual(listingAttestationTemplate.kind)
  signedEvent.tags.forEach(tag => {
    if (tag.length > 1) {
      switch (tag[0]) {
        case 'e':
          expect(tag[1]).toEqual(event.id)
          break
        case 'a':
          expect(tag[1]).toEqual(identifier)
          break
      }
    }
  })
  expect(signedEvent.content).toContain(
    'Attestation for classified listing event (Lorem Ipsum).'
  )
  expect(typeof signedEvent.created_at).toEqual('number')
  expect(signedEvent.pubkey).toEqual(badgeIssuerPublicKey)
})
