import {
  UnsignedEvent,
  VerifiedEvent,
  finishEvent,
  getPublicKey
} from 'nostr-tools'

export const enum Nip58Kind {
  BadgeDefinition = 30009,
  BadgeAward = 8
}

export const BadgeTypeLabelNamespace = 'com.akaprofiles.badge.type'
export const enum BadgeType {
  Badge = 'BADGE',
  Group = 'GROUP'
}

/**
 * Known tag IDs for Badge Definition event
 * "Ext" prefix indicates additional IDs used by akaprofiles
 * e.g.
 * ["d","over-21"]
 * ["name", "Over 21"]
 * ["description", "User is over 21 years of age."]
 * ["image", "https://ageverifier.com/images/over21.png"]
 * ["thumb", "https://ageverifier.com/images/over21_128x128.png"]
 * ["client, "akaprofiles"]
 * ["L", "com.akaprofiles.badge.type"]
 * "l", "BADGE", "com.akaprofiles.badge.type"]
 * ["a", "30009:<issuer pubkey>:<badge identifier>"]
 * ["a", "30009:<issuer pubkey>:<badge identifier>", "wss://relay.damus.io"]
 * ["applyURL", "https://ageverifier.com/badgeapply"]
 * ["configURL", "https://ageverifier.com/config"]
 *
 * ExtClient
 * - name of client used to issue event
 * ExtRequiredBadge
 * - one or more previously awarded badges required to automatically award this badge
 * ExtApplyURL
 * - self-service URL for users to apply for badge
 * ExtConfigURL
 * - self-service URL for users to configure the badge
 * ExtBadgeType
 * - either GROUP or BADGE, indicating how apps should interpret this badge
 */
export enum BadgeDefinitionTagID {
  Identifier = 'd',
  Name = 'name',
  Description = 'description',
  Image = 'image',
  Thumbnail = 'thumb',
  ExtRequiredBadge = 'a',
  ExtClient = 'client',
  ExtApplyURL = 'applyURL',
  ExtConfigURL = 'configURL',
  ExtBadgeTypeNamespace = 'L',
  ExtBadgeType = 'l'
}

export type BadgeDefinitionProps = {
  name: string
  description: string
  image: string
  identifier: string
  type: BadgeType
  thumbnail?: string
  content?: string
  client?: string
  pubkey?: string
  applyURL?: string
  configURL?: string
}

export class BadgeDefinition {
  readonly kind = Nip58Kind.BadgeDefinition
  name: string
  description: string
  image: string
  thumbnail: string
  identifier: string
  type: BadgeType
  client: string
  pubkey: string
  content: string
  applyURL: string
  configURL: string

  private reqBadges: Record<string, string[]> = {}
  private otherTags: Record<string, string[]> = {}

  public constructor(props: BadgeDefinitionProps) {
    this.name = props.name
    this.description = props.description
    this.image = props.image
    this.identifier = props.identifier
    this.type = props.type
    this.thumbnail = props.thumbnail ? props.thumbnail : ''
    this.content = props.content ? props.content : ''
    this.client = props.client ? props.client : ''
    this.pubkey = props.pubkey ? props.pubkey : ''
    this.applyURL = props.applyURL ? props.applyURL : ''
    this.configURL = props.configURL ? props.configURL : ''
  }

  addRequiredBadge(identifier: string, relay?: string) {
    this.reqBadges[identifier] = relay
      ? [BadgeDefinitionTagID.ExtRequiredBadge, identifier, relay]
      : [BadgeDefinitionTagID.ExtRequiredBadge, identifier]
  }

  removeRequiredBadge(identifier: string) {
    delete this.reqBadges[identifier]
  }

  addOtherTag(tag: string[]) {
    this.otherTags[tag[0]] = tag
  }

  removeOtherTag(identifier: string) {
    delete this.otherTags[identifier]
  }

  getPREIdentifier() {
    if (this.pubkey == '' || this.identifier == '') return null
    return `${this.kind}:${this.pubkey}:${this.identifier}`
  }

  toUnsignedEvent() {
    const event: UnsignedEvent<Nip58Kind.BadgeDefinition> = {
      pubkey: this.pubkey,
      kind: this.kind,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: this.content
    }

    event.tags.push([BadgeDefinitionTagID.Identifier, this.identifier])
    event.tags.push([BadgeDefinitionTagID.Name, this.name])
    event.tags.push([BadgeDefinitionTagID.Description, this.description])
    event.tags.push([BadgeDefinitionTagID.Image, this.image])

    if (this.thumbnail != '')
      event.tags.push([BadgeDefinitionTagID.Thumbnail, this.thumbnail])
    if (this.client != '')
      event.tags.push([BadgeDefinitionTagID.ExtClient, this.client])
    if (this.applyURL != '') {
      event.tags.push([BadgeDefinitionTagID.ExtApplyURL, this.applyURL])
    }
    if (this.configURL != '') {
      event.tags.push([BadgeDefinitionTagID.ExtConfigURL, this.configURL])
    }
    event.tags.push([
      BadgeDefinitionTagID.ExtBadgeTypeNamespace,
      BadgeTypeLabelNamespace
    ])
    event.tags.push([
      BadgeDefinitionTagID.ExtBadgeType,
      this.type,
      BadgeTypeLabelNamespace
    ])
    for (let id in this.reqBadges) {
      event.tags.push(this.reqBadges[id])
    }
    for (let id in this.otherTags) {
      event.tags.push(this.otherTags[id])
    }

    return event
  }

  toSignedEvent(privateKey: string) {
    this.pubkey = getPublicKey(privateKey)
    const event =
      this.toUnsignedEvent() as VerifiedEvent<Nip58Kind.BadgeDefinition>
    return finishEvent(event, privateKey)
  }
}

/**
 * Known tag IDs for Badge Award event
 * "Ext" prefix indicates additional IDs used by akaprofiles
 * e.g.
 * ["a", "30009:<issuer pubkey>:<badge identifier>"]
 * ["a", "30009:<issuer pubkey>:<badge identifier>", "wss://relay.damus.io"]
 * ["p", "<awardee pubkey>"],
 * ["p", "<awardee pubkey>", "wss://relay.damus.io"],
 *
 *  * ExtClient
 * - name of client used to issue event
 */
export enum BadgeAwardTagID {
  AwardedBadge = 'a',
  AwardeePubkey = 'p',
  ExtClient = 'client'
}

export type BadgeAwardProps = {
  awardedBadge: string
  awardedBadgeRelay?: string
  awardeePubkey: string
  awardeeRelay?: string
  client?: string
  pubkey?: string
}

export class BadgeAward {
  readonly kind = Nip58Kind.BadgeAward
  client: string
  pubkey: string
  content: string = ''
  awardedBadge: string[]

  private awardees: Record<string, string[]> = {}
  private otherTags: Record<string, string[]> = {}

  public constructor(props: BadgeAwardProps) {
    this.awardedBadge = props.awardedBadgeRelay
      ? [
          BadgeAwardTagID.AwardedBadge,
          props.awardedBadge,
          props.awardedBadgeRelay
        ]
      : [BadgeAwardTagID.AwardedBadge, props.awardedBadge]
    this.awardees[BadgeAwardTagID.AwardeePubkey] = props.awardeeRelay
      ? [BadgeAwardTagID.AwardeePubkey, props.awardeePubkey, props.awardeeRelay]
      : [BadgeAwardTagID.AwardeePubkey, props.awardeePubkey]

    this.client = props.client ? props.client : ''
    this.pubkey = props.pubkey ? props.pubkey : ''
  }

  addAwardee(pubkey: string, relay?: string) {
    this.awardees[pubkey] = relay
      ? [BadgeAwardTagID.AwardeePubkey, pubkey, relay]
      : [BadgeAwardTagID.AwardeePubkey, pubkey]
  }

  removeAwardee(pubkey: string) {
    delete this.awardees[pubkey]
  }

  addOtherTag(tag: string[]) {
    this.otherTags[tag[0]] = tag
  }

  removeOtherTag(identifier: string) {
    delete this.otherTags[identifier]
  }

  toUnsignedEvent() {
    const event: UnsignedEvent<Nip58Kind.BadgeAward> = {
      kind: this.kind,
      pubkey: this.pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: this.content
    }

    event.tags.push(this.awardedBadge)
    if (this.client != '')
      event.tags.push([BadgeDefinitionTagID.ExtClient, this.client])

    for (let id in this.awardees) {
      event.tags.push(this.awardees[id])
    }

    for (let id in this.otherTags) {
      event.tags.push(this.otherTags[id])
    }

    return event
  }

  toSignedEvent(privateKey: string) {
    this.pubkey = getPublicKey(privateKey)
    const event = this.toUnsignedEvent() as VerifiedEvent<Nip58Kind.BadgeAward>
    return finishEvent(event, privateKey)
  }
}
