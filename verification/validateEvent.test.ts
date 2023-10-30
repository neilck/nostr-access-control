import {
  userPublicKey,
  badgeIssuerPublicKey,
  classifiedListingTemplate,
  badgeAwardTemplate
} from '../test/test-data'
import {validateBadgeAward, ValidateBadgeAwardError} from './validateEvent'
test('badgeAwardEvent good', () => {
  const result = validateBadgeAward({
    badgeAwardEvent: badgeAwardTemplate,
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate
  })

  expect(result.isValid).toEqual(true)
  expect(result.errors).toBeUndefined()
})

test('badgeAwardEvent wrong user', () => {
  const result = validateBadgeAward({
    badgeAwardEvent: badgeAwardTemplate,
    userPublicKey:
      '00d0791c1a6435c83f498f758d62b9a6785794fcc9df16f833b16b5f0e4265b9',
    classifiedListingEvent: classifiedListingTemplate
  })

  expect(result.isValid).toEqual(false)
  expect(result.errors!.length).toEqual(1)
  expect(result.errors![0]).toEqual(ValidateBadgeAwardError.PTagError)
})

test('badgeAwardEvent not related', () => {
  const event = badgeAwardTemplate
  let aTag = event.tags.find(tag => tag[0] == 'a')
  if (aTag) {
    aTag[1] = 'bad'
  }
  const result = validateBadgeAward({
    badgeAwardEvent: badgeAwardTemplate,
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate
  })

  expect(result.errors!.length).toEqual(1)
  expect(result.errors![0]).toEqual(ValidateBadgeAwardError.NotRequired)
})

test('badgeAwardEvent too many tags', () => {
  const event = badgeAwardTemplate
  event.tags.push(['a', 'another tag'])

  const result = validateBadgeAward({
    badgeAwardEvent: badgeAwardTemplate,
    userPublicKey: userPublicKey,
    classifiedListingEvent: classifiedListingTemplate
  })

  expect(result.errors!.length).toEqual(1)
  expect(result.errors![0]).toEqual(ValidateBadgeAwardError.ATagError)
})
