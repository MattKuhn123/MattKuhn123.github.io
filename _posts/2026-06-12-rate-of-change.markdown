---
layout: post
title:  "Rate of change"
date:   2026-06-12 08:00:00 -0400
categories: programming
---
# Hypothesis

One factor of value for the rate at which you change an application **is the rate at which the users can understand the changes.**

My contention is that going _faster_ is not strictly always _better_.

## Enterprise Example

Consider working in an enterprise environment on an established application and user base. The users have an expectation of how the application works and facilitates/automates parts of their job.

Any application that is not already **perfect** _(ha)_ will always need to be changed. Enterprises have organizational structures for facilitating change; application development teams with program managers, product owners, analysts, developers, etc. 

## Change delivery introduces complexity

Usually, the value that a change has is the way it impacts how the system works.

_(As a banal example: updating business rules to change how contracts are assigned to business units.)_

In almost every enterprise application ecosystem, there are business analysts who's responsibility is to interpret what the application does and why.

There are two reasons why this is necessary: 
1. Strangely, even though theoretically the application should only do explicitly what the specifications indicated that it should, it doesn't. This can happen for any and every reason.
2. Even if it always did _exactly_ what it was supposed to do, no one can maintain in their mind the minutia of what that entails.

Therefore, business analysts need to constantly update their mental model of how the application works.

- If the application changes more quickly than the business analysts can understand, then the value that the application brings to the enterprise degrades.
- If the application behaves in ways that the users do not understand, _even if those new behaviors SHOULD be theoretically desirable_ then it doesn't bring value to anyone.

## Functionality that is not understood is called "bloat" or "buggy" or is not acknowledged at all.

If a tree falls in the forest and no one is around to hear it, then **NO**; it effectively **doesn't** make a sound. _(Here, we are defining sound as only having meaning in the context of human experience)._

Functionality that users don't expect (even if _could_ hypothetically be desirable, if the functionality _was_ expected) doesn't deliver value. 
 
## Implication

Time should be spent _not only_ on *implementating* changes, but also creating ways to *communicate, monitor, test, and demonstrate* them.

*Specifically for developers,* AI should not *only* be used to increase the rate at which they fulfill user stories; but should *also* be used to more thoroughly test changes and find creative ways to simplify how the application is understood to behave. 

Developers are servants to their product owners, program managers, and each other. They are not lords of the real estate of the code base they work in.
