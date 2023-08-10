import {getPublicKey} from 'nostr-tools'
import {verifyEligibility} from './index'
import {
  userPublicKey,
  badgeIssuerPublicKey,
  classifiedListingTemplate,
  classifiedListingNoBadgesTemplate,
  badgeAwardTemplate,
  badgeAwardTemplate2
} from './test-data'
import {ValidateBadgeAwardError} from './validateEvent'

test('eligibility pass', () => {
  const result = verifyEligibility({
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate,
    badgeAwardEvents: [badgeAwardTemplate, badgeAwardTemplate2]
  })

  console.log(JSON.stringify(result, null, 2))

  const resultTemplate = {
    isEligible: true,
    badges: [
      {
        d: '30009:0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab:over21',
        isValid: true
      },
      {
        d: '30009:3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0:notabot',
        isValid: true
      }
    ]
  }

  expect(result).toEqual(resultTemplate)
})

test('eligibility missing', () => {
  const result = verifyEligibility({
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate,
    badgeAwardEvents: [badgeAwardTemplate]
  })

  const resultTemplate = {
    isEligible: false,
    badges: [
      {
        d: '30009:0d185ebea8028420dcc8b10b19876514d22f0eaeeb2378cc3e9cbb8c0b616bab:over21',
        isValid: true
      },
      {
        d: '30009:3ef9157164de5d945264dd2c8b4759d868394f5427379b4384762a8b369b08d0:notabot',
        isValid: false,
        errors: ['MISSING']
      }
    ]
  }

  expect(result).toEqual(resultTemplate)
})

test('eligibility no badges', () => {
  const result = verifyEligibility({
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingNoBadgesTemplate,
    badgeAwardEvents: []
  })

  console.log(result)

  const resultTemplate = {
    isEligible: true,
    badges: []
  }

  expect(result).toEqual(resultTemplate)
})
