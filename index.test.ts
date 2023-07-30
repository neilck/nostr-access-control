import {getPublicKey} from 'nostr-tools'
import {verifyEligibility} from './index'
import {
  userPublicKey,
  classifiedListingTemplate,
  badgeAwardTemplate
} from './test-data'

test('good', () => {
  const {success, error, foundBadges, missingBadges} = verifyEligibility({
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate,
    badgeAwardEvents: [badgeAwardTemplate]
  })

  console.log(success)
  console.log(error)
  console.log(foundBadges)
  console.log(missingBadges)
})
