import {verifyEligibility} from './index'
import {
  userPublicKey,
  classifiedListingTemplate,
  badgeAwardTemplate
} from './test-data'

test('sample', () => {
  const result = verifyEligibility({
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate,
    badgeAwardEvents: [badgeAwardTemplate]
  })

  const {isEligible, badges, errors} = result

  if (isEligible) console.log('user is eligible to access the resource')
  else {
    console.log('user is not eligible to access the resource')
  }

  if (errors) {
    console.log(`Overall errors: ${errors}`)
  }

  if (badges) {
    badges.forEach(badge => {
      const {d, isValid, errors} = badge
      if (isValid) {
        console.log(`User awarded required badge ${badge.d}`)
      } else {
        console.log(
          `Error(s) with awarded badge ${badge.d}. Errors: ${badge.errors}`
        )
      }
    })
  }

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
