import {Event, Kind} from 'nostr-tools'
import {verifyEvent, getTagFirstValues} from '../utils'

enum ValidateBadgeAwardError {
  ValidationError = 'VALIDATION_ERROR', // badge not valid Nostr event
  KindError = 'KIND_ERROR', // wrong kind
  PTagError = 'PTAG_ERROR', // not issued to provided pubkey
  NotRequired = 'NOT_REQUIRED', // not a required badge for eligibilty
  ATagError = 'ATAG_ERROR', // event does not have exactly one a tag
  Missing = 'MISSING' // badge event not found
}

type ValidateBadgeAwardResult = {
  d: string
  isValid: boolean
  errors?: ValidateBadgeAwardError[]
}

/**
 * Validates badge award event and relationship to pubkey and classifiedListingEvent
 * @param props
 * @returns
 */
const validateBadgeAward = (props: {
  badgeAwardEvent: Event
  userPublicKey: string
  classifiedListingEvent: Event
}) => {
  const errors = [] as ValidateBadgeAwardError[]
  const event = props.badgeAwardEvent
  const userPublicKey = props.userPublicKey
  const classifiedListingEvent = props.classifiedListingEvent
  const listingBadgeDefs = getTagFirstValues('a', classifiedListingEvent.tags)

  let {isValid, isVerified} = verifyEvent(event)
  if (!isValid || !isVerified) {
    errors.push(ValidateBadgeAwardError.ValidationError)
  }

  if (event.kind != Kind.BadgeAward) {
    errors.push(ValidateBadgeAwardError.KindError)
  }

  // verify badge award issued to user
  const pList = getTagFirstValues('p', event.tags)
  if (pList.indexOf(userPublicKey) == -1) {
    errors.push(ValidateBadgeAwardError.PTagError)
  }

  // verify badge award related to classified listing
  // a tag should match
  const list = getTagFirstValues('a', event.tags)
  let awardBadgeDef = ''
  if (list.length == 1) {
    awardBadgeDef = list[0]
    if (listingBadgeDefs.indexOf(awardBadgeDef) == -1)
      errors.push(ValidateBadgeAwardError.NotRequired)
  } else {
    errors.push(ValidateBadgeAwardError.ATagError)
  }

  if (errors.length == 0) {
    return {d: awardBadgeDef, isValid: true}
  } else
    return {
      d: awardBadgeDef,
      isValid: false,
      errors
    }
}

export {validateBadgeAward, ValidateBadgeAwardError, ValidateBadgeAwardResult}
