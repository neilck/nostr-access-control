import {Nip58Kind, BadgeDefinitionTagID, BadgeAwardTagID} from './nip58'
import {Nip99Kind, ClassifiedListingTagID} from './nip99'

import {
  UnsignedEvent,
  VerifiedEvent,
  finishEvent,
  getPublicKey
} from 'nostr-tools'

export const enum AttestationKind {
  TextNote = 1
}

/**
 * Known tag IDs for Attestation event
 * signed by pubkey of the attester
 * "Ext" prefix indicates additional IDs used by akaprofiles
 * e.g.
 * ["e","<event id>"]
 * - event id referenced by this attestation event
 * ["a", "30009:<issuer pubkey>:<identifier>"]
 * - address pointer to parameterized, replaceable event
 * ["client, "akaprofiles"]
 */
export enum AttestationTagID {
  ReferencedEventId = 'e',
  AddressPointer = 'a',
  ExtClient = 'client'
}

export type AttestationProps = {
  referencedEvent: VerifiedEvent
}

export class Attestation {
  readonly kind = AttestationKind.TextNote
  client: string
  pubkey: string
  content: string
  referencedEvent: VerifiedEvent
  addressPointer: string

  private tags: Record<string, string[]> = {}

  public constructor(props: AttestationProps) {
    this.client = 'akaprofiles'
    this.pubkey = ''
    this.content = ''
    this.referencedEvent = props.referencedEvent
    this.addressPointer = ''

    const e = props.referencedEvent
    let title = ''
    let name = ''
    let awardeePubkey = ''
    for (let i = 0; i < e.tags.length; i++) {
      const tag = e.tags[i]
      if (tag.length > 1) {
        switch (tag[0]) {
          case BadgeDefinitionTagID.Identifier:
            this.addressPointer = `${e.kind}:${e.pubkey}:${tag[1]}`
            break
          case BadgeDefinitionTagID.Name:
            if (e.kind == Nip58Kind.BadgeDefinition) {
              name = tag[1]
            }
            break
          case ClassifiedListingTagID.Title:
            if (e.kind == Nip99Kind.ClassifiedListing) {
              title = tag[1]
            }
            break
          case BadgeAwardTagID.AwardeePubkey:
            if (e.kind == Nip58Kind.BadgeAward) {
              awardeePubkey = tag[1]
            }
        }
      }
    }

    switch (e.kind) {
      case Nip58Kind.BadgeDefinition:
        this.content = `Attestation for badge definition event (${name}).`
        break
      case Nip58Kind.BadgeAward:
        this.content = `Attestation for badge award event.`
        break
      case Nip99Kind.ClassifiedListing:
        this.content = `Attestation for classified listing event (${title}).`
        break
    }
  }

  addTag(tag: string[]) {
    this.tags[tag[0]] = tag
  }

  removeTag(identifier: string) {
    delete this.tags[identifier]
  }

  toUnsignedEvent() {
    const date = new Date()
    const created_at = Math.floor(date.getTime() / 1000)
    this.content = `${this.content} Signed on ${date.toUTCString()}`

    const event: UnsignedEvent<AttestationKind> = {
      pubkey: this.pubkey,
      kind: this.kind,
      created_at: created_at,
      tags: [],
      content: this.content
    }

    event.tags.push([
      AttestationTagID.ReferencedEventId,
      this.referencedEvent.id
    ])

    if (this.addressPointer != '') {
      event.tags.push([AttestationTagID.AddressPointer, this.addressPointer])
    }
    event.tags.push([AttestationTagID.ExtClient, this.client])

    return event
  }

  toSignedEvent(privateKey: string) {
    this.pubkey = getPublicKey(privateKey)
    const event =
      this.toUnsignedEvent() as VerifiedEvent<AttestationKind.TextNote>
    return finishEvent(event, privateKey)
  }
}
