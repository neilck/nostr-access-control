import {Event} from 'nostr-tools'
import {verifyEvent, getTagFirstValues} from '../utils'
import {
  validateBadgeAward,
  ValidateBadgeAwardResult,
  ValidateBadgeAwardError
} from './validateEvent.ts'

type EligibilityResult = {
  isEligible: boolean
  badges?: ValidateBadgeAwardResult[]
  errors?: string[]
}

const verifyEligibility = (props: {
  userPublicKey: string
  eventWithCriteria: Event
  badgeAwardEvents: Event[]
}): EligibilityResult => {
  const {userPublicKey, eventWithCriteria, badgeAwardEvents} = props

  const badges = [] as ValidateBadgeAwardResult[]

  if (userPublicKey == '')
    return {isEligible: false, errors: [`userPublicKey is empty`]}

  // check event validity
  let {isValid, isVerified} = verifyEvent(eventWithCriteria)
  if (!isValid || !isVerified) {
    return {
      isEligible: false,
      errors: [`classified listing event ${eventWithCriteria.id} is not valid`]
    }
  }

  badgeAwardEvents.forEach(event => {
    badges.push(
      validateBadgeAward({
        badgeAwardEvent: event,
        userPublicKey: userPublicKey,
        classifiedListingEvent: eventWithCriteria
      })
    )
  })

  const missingBadges = [] as string[]
  const requiredBadges = getTagFirstValues('a', eventWithCriteria.tags)

  // find missing badges
  requiredBadges.forEach(requiredBadge => {
    const matched = badges.find(foundBadge => {
      return foundBadge.d == requiredBadge
    })
    if (!matched) missingBadges.push(requiredBadge)
  })

  missingBadges.forEach(missingBadge => {
    badges.push({
      d: missingBadge,
      isValid: false,
      errors: [ValidateBadgeAwardError.Missing]
    })
  })

  // set overall isEligible status
  const map = new Map()
  requiredBadges.forEach(requiredBadge => {
    map.set(requiredBadge, false)
  })

  badges.forEach(badge => {
    if (badge.isValid && map.has(badge.d)) {
      map.set(badge.d, true)
    }
  })

  let isEligibile = true
  map.forEach((value, key, map) => {
    if (value == false) isEligibile = false
  })

  return {
    isEligible: isEligibile,
    badges
  }
}

export {verifyEligibility}
