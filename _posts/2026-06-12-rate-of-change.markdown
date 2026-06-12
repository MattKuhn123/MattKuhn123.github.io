---
layout: post
title:  "Rate of change"
date:   2026-06-12 08:00:00 -0400
categories: programming
---
# Hypothesis

One factor of value for an application **is the rate at which the change rate can be understood by those who use the application.**

My contention is that going _faster_ is not strictly always _better_.

I acknowledge that the application is not perfect; it always needs updating. There are always new demands that need to be fulfilled and outdated functionality that needs to be removed. The users know this, and they work within their organizational structure to make changes to the application. 

## Enterprise Example

Consider working in an enterprise environment on an established application and user base. The users have an expectation of how the application works and facilitates/automates parts of their job.

## Change delivery introduces complexity

Usually, the value that a change has is the way it impacts how the system works.

_(As a banal example: updating business rules to change how contracts are assigned to business units)_

In almost every enterprise application ecosystem, there are business analysts who's responsibility is to interpret what the application does and why.

There are two reasons why this is necessary: 
1. Strangely, even though theoretically the application should only do explicitly what the specifications indicated that it should, it doesn't. This could be because of imperceptible bugs that made it through the testing environment, or because of a lack of granularity in the specifications.
2. Even if it always did _exactly_ what it was supposed to do, no one can maintain in their mind what all that is supposed to be!

Therefore, business analysts need to constantly update their mental model of how the application works.

- If the application changes more quickly than the business analysts can understand, then the value that the application brings to the enterprise degrades.
- If the application behaves in ways that the users do not understand, _even if those new behaviors SHOULD be theoretically desirable_ then it doesn't bring value to anyone.
 
## Implication

Time should be spent _not only_ on *implementating* changes, but also creating ways to *monitor, test, and communicate* them.

*Specifically for developers* AI should not *only* be used to increase the rate at which they fulfill user stories; but should *also* be used to more thoroughly test changes and find creative ways to simplify how the application is understood to behave.
