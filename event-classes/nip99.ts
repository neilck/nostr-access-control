import {
  UnsignedEvent,
  VerifiedEvent,
  finishEvent,
  getPublicKey
} from 'nostr-tools'

export const enum Nip99Kind {
  ClassifiedListing = 30402
}

export enum ClassifiedListingTagID {
  Identifier = 'd',
  Title = 'title',
  Summary = 'summary',
  Image = 'image',
  Thumbnail = 'thunb',

  PublishedAt = 'published_at',
  ExtRequiredBadge = 'a',
  ExtClient = 'client'
}

export type ClassifiedListingProps = {
  title: string
  summary: string
  image: string
  identifier: string
  content: string
  thumbnail?: string
  client?: string
  pubkey?: string
  published_at?: number
}

export class ClassifiedListing {
  readonly kind = Nip99Kind.ClassifiedListing
  title: string
  summary: string
  image: string
  thumbnail: string
  identifier: string
  client: string
  pubkey: string
  content: string
  published_at: number

  private reqBadges: Record<string, string[]> = {}
  private otherTags: Record<string, string[]> = {}

  public constructor(props: ClassifiedListingProps) {
    this.title = props.title
    this.summary = props.summary
    this.image = props.image
    this.identifier = props.identifier
    this.thumbnail = props.thumbnail ? props.thumbnail : ''
    this.content = props.content ? props.content : ''
    this.client = props.client ? props.client : ''
    this.pubkey = props.pubkey ? props.pubkey : ''
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
