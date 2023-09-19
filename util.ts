import {validateEvent, verifySignature} from 'nostr-tools'

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

export {verifyEvent, parseATag, getTagFirstValues}
