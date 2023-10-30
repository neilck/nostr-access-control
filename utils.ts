import {Event, UnsignedEvent, validateEvent, verifySignature} from 'nostr-tools'
import {isParameterizedReplaceableKind} from './kinds'

/**
 * Verifies nostr event
 * @param {request}
 * @returns
 */
const verifyEvent = (event: any) => {
  if (!event) {
    return {isValid: false, isVerified: false}
  }

  const isValid = validateEvent(event)
  const isVerified = verifySignature(event)

  return {isValid: isValid, isVerified: isVerified}
}

/**
 * parse NIP-33 a tag
 * @param aTag
 * @returns kind, pubkey, dTag
 */
const parseATag = (
  aTag: string
): {kind?: number; pubkey?: string; id?: string} => {
  const value: {kind?: number; pubkey?: string; id?: string} = {}
  const tokens = aTag.split(':')
  if (tokens.length > 0) {
    const kind = Number(tokens[0])
    if (!isNaN(kind)) value.kind = kind
  }

  if (tokens.length > 1) value.pubkey = tokens[1]
  if (tokens.length > 2) value.id = tokens[2]

  return value
}

/**
 * returns array of just the first values for given tag
 * @param key
 * @param tags
 * @returns
 */
const getTagFirstValues = (key: string, tags: string[][]) => {
  const firstValues = [] as string[]
  const matchingTags = tags.filter(tag => {
    return tag[0] == key
  })
  matchingTags.forEach(tag => {
    if (tag.length > 1) {
      firstValues.push(tag[1])
    }
  })

  return firstValues
}

// returns parameterized replaceable event identifier to be used as "a" tag value
// returns undefined if not PR event or missing data
const getPREIdentifier = (e: Event | UnsignedEvent) => {
  if (!isParameterizedReplaceableKind(e.kind)) return undefined
  if (e.pubkey == '') return undefined

  let identifier = ''
  for (let i = 0; i < e.tags.length; i++) {
    const tag = e.tags[i]
    if (tag.length > 1 && tag[0] == 'd') {
      identifier = tag[1]
      break
    }
  }

  if (identifier == '') return undefined

  return `${e.kind.toString()}:${e.pubkey}:${identifier}`
}

export {verifyEvent, parseATag, getTagFirstValues, getPREIdentifier}
