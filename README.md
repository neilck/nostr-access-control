# Decenralized Access Control with Nostr (nostr-access-control)

This proposal specifies how to implement decentralized access control with Nostr. 

Access control is the process of determining if a user has rights to access a resource. 

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
For these example events, a Nostr client (resource owner) will only display sensitive content (e.g. NIP-36) if a user has been awarded an Age Verified badge, issued by a indepdendent service (badge issuer).

*Classified Listing*
```json
{
  "kind": 30402,
  "created_at": ...,
  "tags": [
    ["d", "sensitive-content"],
    ["title", "Sensitive Content"],
    ["image", "https://ipsum.com/rated-r.png", "256x256"],
    ["summary", "Sensitive content on Ipsum App"],
    ["a", "30009:<badge issuer pubkey>:over21", "wss://relay"],
  ],
  "pubkey": "<resource owner pubkey>",
  "id": "...",
  "sig": "...",
}
```

*Badge Definition*
```json
{
  "kind": 30009,
  "created_at": ...,
  "tags": [
    ["d", "over21"],
    ["name", "Over 21"],
    ["image", "https://ageverifier.com/images/over21.png", "256x256"],
    ["description", "User is over 21 years of age."],
  ],
  "pubkey": "<badge issuer pubkey>",
  "id": "...",
  "sig": "...",
}
```

*Badge Award*
```json
{
  "kind": 8,
  "created_at": ...,
  "tags": [
    ["a", "30009:<badge issuer pubkey>:over21"],
    ["p", "<user pubkey>", "wss://relay"],
  ],
  "pubkey": "<badge issuer pubkey>",
  "id": "...",
  "sig": "...",
}
```

### Access Control Workflow
Overview of how an app can verify a user's eligibility before granting access to a resource

1. Authenicate that user owns a public key (e.g. successful user login or Nostr Connect).
2. For given resource, get Classified Listing event and related Badge Definition events referenced in `a tags`.
3. For each Badge Definition event, get related Badge Award events awarded to user's public key.
4. Grant access if all badges awarded, inform user of missing badges if not.



