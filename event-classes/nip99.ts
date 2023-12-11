import {
  UnsignedEvent,
  VerifiedEvent,
  finishEvent,
  getPublicKey
} from 'nostr-tools'

export const enum Nip99Kind {
  ClassifiedListing = 30402
}

export const ListingTypeLabelNamespace = 'com.akaprofiles.listing.type'
export const enum ListingType {
  Classified = 'CLASSIFIED',
  Offer = 'OFFER'
}

/**
 * Known tag IDs for Classifed Listing event
 * "Ext" prefix indicates additional IDs used by akaprofiles
 * e.g.
 * ["d","member-discount"]
 * ["name", "20% Off Coupon Code"]
 * ["description", "Group members receive 20% off all merch in March."]
 * ["image", "https://merch.com/images/offer20.png"]
 * ["thumb", "https://merch.com/images/offer20_128x128.png"]
 * ["L", "com.akaprofiles.listing.type"]
 * "l", "OFFER", "com.akaprofiles.listing.type"]
 * ["client, "akaprofiles"]
 * ["a", "30402:<issuer pubkey>:<group identifier>"]
 * ["applyURL", "https://akaprofiles.com/offer/1234"]
 *
 * ExtClient
 * - name of client used to issue event
 * ExtRequiredBadge
 * - one or more previously awarded badges required to automatically award this offer
 * ExtApplyURL
 * - self-service URL for users to apply for offer
 * ExtBadgeType
 * - either CLASSIFIED or OFFER, indicating how apps should interpret this listing
 *   (always OFFER within akaprofiles context)
 */
export enum ClassifiedListingTagID {
  Identifier = 'd',
  Title = 'title',
  Summary = 'summary',
  Image = 'image',
  Thumbnail = 'thumb',

  PublishedAt = 'published_at',
  ExtRequiredBadge = 'a',
  ExtClient = 'client',
  ExtApplyURL = 'applyURL',
  ExtListingTypeNamespace = 'L',
  ExtListingType = 'l'
}

export type ClassifiedListingProps = {
  title: string
  summary: string
  image: string
  identifier: string
  type: ListingType
  content: string
  thumbnail?: string
  client?: string
  pubkey?: string
  published_at?: number
  applyURL?: string
}

export class ClassifiedListing {
  readonly kind = Nip99Kind.ClassifiedListing
  title: string
  summary: string
  image: string
  thumbnail: string
  identifier: string
  type: ListingType
  client: string
  pubkey: string
  content: string
  published_at: number
  applyURL: string

  private reqBadges: Record<string, string[]> = {}
  private otherTags: Record<string, string[]> = {}

  public constructor(props: ClassifiedListingProps) {
    this.title = props.title
    this.summary = props.summary
    this.image = props.image
    this.identifier = props.identifier
    this.thumbnail = props.thumbnail ? props.thumbnail : ''
    this.type = props.type
    this.content = props.content ? props.content : ''
    this.client = props.client ? props.client : ''
    this.pubkey = props.pubkey ? props.pubkey : ''
    this.applyURL = props.applyURL ? props.applyURL : ''
    this.published_at = props.published_at ? props.published_at : 0
  }

  addRequiredBadge(identifier: string, relay?: string) {
    this.reqBadges[identifier] = relay
      ? [ClassifiedListingTagID.ExtRequiredBadge, identifier, relay]
      : [ClassifiedListingTagID.ExtRequiredBadge, identifier]
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
    const event: UnsignedEvent<Nip99Kind.ClassifiedListing> = {
      pubkey: this.pubkey,
      kind: this.kind,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: this.content
    }

    event.tags.push([ClassifiedListingTagID.Identifier, this.identifier])
    event.tags.push([ClassifiedListingTagID.Title, this.title])
    event.tags.push([ClassifiedListingTagID.Summary, this.summary])
    event.tags.push([ClassifiedListingTagID.Image, this.image])
    if (this.thumbnail != '')
      event.tags.push([ClassifiedListingTagID.Thumbnail, this.thumbnail])
    if (this.client != '')
      event.tags.push([ClassifiedListingTagID.ExtClient, this.client])
    if (this.applyURL != '') {
      event.tags.push([ClassifiedListingTagID.ExtApplyURL, this.applyURL])
    }
    event.tags.push([
      ClassifiedListingTagID.ExtListingTypeNamespace,
      ListingTypeLabelNamespace
    ])
    event.tags.push([
      ClassifiedListingTagID.ExtListingType,
      this.type,
      ListingTypeLabelNamespace
    ])
    if (this.published_at > 0)
      event.tags.push([
        ClassifiedListingTagID.PublishedAt,
        this.published_at.toString()
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
      this.toUnsignedEvent() as VerifiedEvent<Nip99Kind.ClassifiedListing>
    return finishEvent(event, privateKey)
  }
}
