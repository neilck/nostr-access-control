# Draft V0.0.2 Decentralized Access Control with Nostr (nostr-access-control)

This NIP defines multiple events to add decentralized access control to Nostr. Access control is the process of determining if a user has rights to access a resource.

### Roles

There are 3 roles in decentralized access control.

- `Resource Owner` - A resource owner defines a resource and required badges to access.
- `Badge Issuer` - A badge issuer defines badges and awards badges to users.
- `User` - A user applies to access a resource based on their badges.

### Workflow

**Prerequisite**
Note: In most cases, it's likely that the resource owner role and the badge issuer role are the same person, but can be different.

A resource owner has published a kind 3xxx1 `Define Protected Resource` event, referencing one or more `Badge Definition` events.

Respective badge issuers have either

1. Already awarded users the badge
2. Included instructions in `Badge Definition` event's `description` tag how to obtain the badge.
3. Included a `link` tag, which contains a URL a user can go to to apply for the badge.

**Step 1 - Determine Eligibiligy**

1. Client displays a `Protected Resource` event, published by the resource owner.
2. For each `Badge Definition` referenced by `Protected Resource` client checks if user has been awarded respective `Badge Award` event.
3. For each unawarded badge, client either displays the instructions from the `Badge Definition` event, or redirects the user to the `link` in the `Badge Definition` event.
4. If all respective badges are awarded, go to Step 2

**Step 2 - Get Access**

1. Client publishes an `Get Protected Resource` event to a relay

### Events

Resource owners define resources by publishing a 3xxx1 `Protected Resource` replaceable event. This is similar to a `Classified Listings` event (NIP-99).

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
```
