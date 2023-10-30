# Decentralized Digital Identity with Nostr

Decentralized digital identity based on Nostr has a chance of achieving mass adoption, unlike existing solutions.

- identities are public by default, allowing for greater discoverability and re-use (Nostr primarily stores data as events on open relays)
- digital identities are pseudo-anonymous, avoiding the complexity required to store real identity information (keypairs are anonymouss, badges don't cotain PII)
- automatic app integration, as digital identity re-uses existing public/private key pairs already in use

Following the unwritten rules on Nostr development, our approach aims to:

- be as simple as possible in the beginning, adding complexity only when necessary
- re-use existing code / specifications as much as possible
- be as decentralized as possible, but not at the expense of simplicity

## Our Model

Our model focuses on two use cases.

**1 - Exclusive Resource Access**

User A, needs to verify information about user B, which can be vouched for by other users, before granting B access to a resource controlled by A.

**2 - Content Filtering by Group**

App A, needs information about user B's group memberships, awarded by other users, so A can show content filtered by group(s).

In our Nostr-based model:

- A user is a `keypair`
- Information about a user provided by other users is a `badge` (NIP-58)
- An exclusive resource is a `classified listing` (NIP-99)

Eligibilty criteria is defined by referencing one or more required `badges` (as `a` tags) in `classified listing event`.
An app can determine a user's eligiblity by verifying all respective `badge award events` have been awarded to user.

A group can be defined by publising a `badge definition event`, and members are added by publishing `badge award events`.
Like with exclusive resource access, groups can have eligibility criteria by adding one or more required `badges` (`a` tags) to a `badge definition event`.
