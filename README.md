# Decentralized Access Control with Nostr (nostr-access-control)

This library implements a decentralized identity model focused on access control with Nostr.

See [Decentralized Digital Identity with Nostr](https://github.com/neilck/nostr-access-control/blob/main/docs/intro.md) for a descriptive overview.

See [nac-demo-app](https://github.com/neilck/nac-demo-app) for a reference implemention app, which is also useful to get events for debugging.

## Developer Guide

Import as npm package:

- `npm -i nostr-access-control`

Run tests (after cloning and `npm install`):

- `npm run test` or `npm run test -t "sample"` to run single test

Complile using `just`

### Project Folders

- `event-functions` folder contains simple functions that return unsigned Nostr events.
- `event-classes` folder contains TypeScript classes, where methods `toUnsignedEvent()` and `toSignedEvent()` return Nostr events.
- `verification` folder contains the `verifyEligibility(...)` function which determines a user's eligibility based on our model.

You can create `Badge Definition`, `Badge Award`, and `Classified Listing` events using either `event-functions` or `event-classes`.

- Functions in `event-functions` minimally implement possible event values, and are meant to be copied and expanded in your own project.
- Classes in `event-classes` are more flexible, and are meant to be used as imported classes within your project.

### Event Examples

For these example events, a Nostr client can check if a user has been awarded an Over 21 badge, issued by a indepdendent service (badge issuer), before showing certain content.

_Classified Listing_

```json
{
  "kind": 30402,
  "created_at": 1675238400,
  "tags": [
    ["d", "sensitive-content"],
    ["title", "Sensitive Content"],
    ["image", "https://ipsum.com/rated-r.png", "256x256"],
    ["summary", "To view this content, you require an Over 21 badge."],
    ["a", "30009:<badge issuer pubkey>:over21", "wss://relay"]
  ],
  "pubkey": "<resource owner pubkey>",
  "id": "...",
  "sig": "..."
}
```

_Badge Definition_

```json
{
  "kind": 30009,
  "created_at": 1672560000,
  "tags": [
    ["d", "over21"],
    ["name", "Over 21"],
    ["image", "https://ageverifier.com/images/over21.png", "256x256"],
    ["description", "User is over 21 years of age."]
  ],
  "pubkey": "<badge issuer pubkey>",
  "id": "...",
  "sig": "..."
}
```

_Badge Award_

```json
{
  "kind": 8,
  "created_at": 1677657600,
  "tags": [
    ["a", "30009:<badge issuer pubkey>:over21"],
    ["p", "<user pubkey>", "wss://relay"]
  ],
  "pubkey": "<badge issuer pubkey>",
  "id": "...",
  "sig": "..."
}
```

## Verifying Eligibility

The `verification` folder contain the `verifyEligibility(...)` function which determines a user's eligibility based on events passed in.

Also returns errors detected during validation of events.

Can run with command: jest -t "sample"

```js
const result = verifyEligibility({
  userPublicKey: userPublicKey,
  classifiedListingEvent: classifiedListingTemplate,
  badgeAwardEvents: [badgeAwardTemplate]
})

const {isEligible, badges, errors} = result

if (isEligible)
{
  console.log('user is eligible to access the resource')
}
else {
  console.log('user is not eligible to access the resource')
}

type EligibilityResult = {
  isEligible: boolean
  badges?: ValidateBadgeAwardResult[]
  errors?: string[]
}

const verifyEligibility = (props: {
  userPublicKey: string
  eventWithCriteria: Event
  badgeAwardEvents: Event[]
}): EligibilityResult => {...}
```

#### Interpreting Results

The `verifyEligibility` function determines if user with `userPublicKey` is eligible for `eventWithCriteria`, based on `badgeAwardEvents`.

The `verifyEligibility` function returns result as `EligilibityResult`.

- `isEligible` boolean is the overall result
- `errors` is a string array of non-badge specific reasons why the user is not eligible.
- `badges` is an array of ValidateBadgeAwardResult objects, which contain the reasons why a required badge in the eligibility criteria is not considered awarded.

If `isEligible` is true, you should expect a `ValidateBadgeAwardResult` item in `badges` for each required badge, where `isValid` is true.

When `isElibile` is not true, you can check `errors` in `EligibilityResult` or `ValidateBadgeAwardResult` items for the reason why user is not eligible.

It is possible that `isEligible` is true, but there exists a `ValidateBadgeAwardResult` where `isValid` is not true, when the `badgeAwardEvents` parameter contains a non-relevant badge award event.
