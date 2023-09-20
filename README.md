# Decentralized Access Control with Nostr (nostr-access-control)

This library implements decentralized access control with Nostr.

See [nac-demo-app](https://github.com/neilck/nac-demo-app) for a reference implemention app, which is also useful to get events for debugging.

Access control is the process of determining if a user has rights to access a resource, consisting of authentication followed by authorization. Authentication in Nostr is simple: signing with a private key proves ownership of an associated public key. Authorization can be achieved by using badge events.

Authorization starts with a resource owner defining an accessible resource by publishing a classified listing event. They include eligibility criteria by including one or more "a tags" to the event referencing badge definition events. A client determines a user's eligibility by checking if the user has been awarded all the required badges.

Acting as a badge issuer, the resource owner can code eligibility logic within their application before awarding a required badge to a user.

### Developer Guide

- Install with `npm -i nostr-access-control`
- Clone repo and run tests using Jest `jest -t "sample"`
- Compile using Just

### Roles

There are 3 roles in decentralized access control.

- `Resource Owner` - A resource owner defines a resource and required badges to access.
- `Badge Issuer` - A badge issuer defines badges and awards badges to users.
- `User` - A user applies to access a resource based on their badges.

### Events

Resource owners define resources by publishing `Classified Listings` events (NIP-99).

Resource owners specify required badges by including `a tags` in `Classified Listings` event pointing to Badge Definition events (NIP-58).

Badge issuers define and award badges to users by publishing `Badge Definition` and `Award Badge` events (NIP-58).

### Event Examples

For these example events, a Nostr client (resource owner) will only display sensitive content (e.g. NIP-36) if a user has been awarded an Over 21 badge, issued by a indepdendent service (badge issuer).

_Classified Listing_

```json
{
  "kind": 30402,
  "created_at": 1675238400,
  "tags": [
    ["d", "sensitive-content"],
    ["title", "Sensitive Content"],
    ["image", "https://ipsum.com/rated-r.png", "256x256"],
    ["summary", "Sensitive content on Ipsum App"],
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

### verifyEligibility

verifyEligibility function takes in user's pubkey, the classified listing event, awarded badge events, and returns if user has all required badges.

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
```
