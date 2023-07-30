import {validateEvent, verifySignature, Kind, Event} from 'nostr-tools'

export * from './nip99.ts'
export * from './nip58.ts'

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
 * @returns
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
 * returns array for first values for given tag
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

export const verifyEligibility = (props: {
  userPublicKey: string
  classifiedListingEvent: Event
  badgeAwardEvents: Event[]
}) => {
  const {userPublicKey, classifiedListingEvent, badgeAwardEvents} = props

  if (userPublicKey == '')
    return {success: false, error: `userPublicKey is empty`}

  // check event validity
  let {isValid, isVerified} = verifyEvent(classifiedListingEvent)
  if (!isValid || !isVerified) {
    return {
      success: false,
      error: `classified listing event ${classifiedListingEvent.id} is not valid`
    }
  }

  const aList = getTagFirstValues('a', classifiedListingEvent.tags)
  if (aList.length == 0) {
    return {success: true, mesg: `0 of 0 badges awarded`}
  }
  console.log('aList ' + aList)

  let foundBadges = [] as string[]
  let allErrors = [] as string[]
  badgeAwardEvents.forEach(event => {
    const errors = [] as string[]
    let {isValid, isVerified} = verifyEvent(event)
    if (!isValid || !isVerified) {
      errors.push(`badge award event ${event.id} is not valid`)
    }

    if (event.kind != Kind.BadgeAward) {
      errors.push(`badge award event ${event.id} not kind ${Kind.BadgeAward}`)
    }

    // verify badge award issued to user
    const pList = getTagFirstValues('p', event.tags)
    if (pList.length == 0) {
      errors.push(
        `badge award event ${event.id} not awarded to ${userPublicKey}`
      )
    }

    // verify badge award related to classified listing
    const list = getTagFirstValues('a', event.tags)
    console.log('tags ' + event.tags)
    console.log('dList ' + list)

    // badge award not related to classified listing
    if (list.length == 0)
      errors.push(`badge award event ${event.id} missing d tag}`)

    if (aList.indexOf(list[0]) == -1)
      errors.push(
        `badge award event ${event.id} a tag not requirement of classified listing`
      )

    // no error on duplicates
    if (errors.length == 0) {
      if (foundBadges.indexOf(list[0]) == -1) foundBadges.push(list[0])
    } else {
      allErrors = allErrors.concat(errors)
    }
  })

  const missingBadges = [] as string[]
  aList.forEach(a => {
    if (foundBadges.indexOf(a) == -1) missingBadges.push(a)
  })

  return {
    success: allErrors.length == 0,
    foundBadges: foundBadges,
    missingBadges: missingBadges
  }
}
