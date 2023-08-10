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
const parseATag = (aTag: string) => {
  const tokens = aTag.split(':')
  return {
    kind: tokens[0],
    pubkey: tokens[1],
    dTag: tokens[2]
  }
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
