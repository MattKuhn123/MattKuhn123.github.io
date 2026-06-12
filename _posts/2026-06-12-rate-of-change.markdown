---
layout: post
title:  "Rate of change"
date:   2026-06-12 08:00:00 -0400
categories: programming
---
# Rate of change

The most valuable rate of change that an application can go through is one that matches the rate at which the rate can be understood by those who use the application.

I say this in contrast to the idea that "faster is better."

The idea that "faster is better" may come from a related idea, which has to do with being "first to market".

While it is still valuable to be first to market, it is not the only thing that matters.

## Enterprise Example

Consider working in an enterprise environment on an established application and user base. 

Those users have an expectation of how the application works and facilitates/automates parts of their job.

## How and why change occurs**

The application is not perfect; it always needs updating. There are always new demands that need to be fulfilled and outdated functionality that needs to be removed.

The users know this, and they work within their organizational structure to make changes to the application. 

## The necessity for change creates a demand for work

This shows up to the development team as "user stories" on their task board.

There is almost always a backlog; there is almost always more work than can be realistically achieved. And more urgent demands ALWAYS skip the line and jump to the top of the priority queue _(as they should)_.

## Change is Complexity

### 1 The workflow for implementing change introduces complexity (Application developers)

Many changes are often in-progress at the same time.

The user stories are almost never fulfilled perfectly on the first try.

Even if they are, they sometimes don't fulfill the need for which the client requested them. 

Worse still, the quality assurance process may sometimes find false-positives of issues.

Change management is, in itself, complex. 

The team that delivers changes cannot deliver them more quickly than they can understand whatever it is that they are delivering.

### 2 Delivering change to the system introduces complexity (Application users)

Usually, the value that a change has is the way it impacts how the system works.

_(As a banal example: updating business rules to change how contracts are assigned to business units)_

In almost every enterprise application ecosystem, there are business analysts who's responsibility is to interpret what the application does and why.

There are two reasons why this is necessary: 
1. Strangely, even though theoretically the application should only do explicitly what the specifications indicated that it should, it doesn't. This could be because of imperceptible bugs that made it through the testing environment, or because of a lack of granularity in the specifications.
2. Even if it always did _exactly_ what it was supposed to do, no one can maintain in their mind what all that is supposed to be!

Therefore, business analysts need to constantly update their mental model of how the application works.

## Again: the rate of change of the application must not exceed the rate at which it can be understood

If the application changes more quickly than the business analysts can understand, then the value that the application brings to the enterprise degrades.

If the application behaves in ways that the users do not understand, _even if those new behaviors SHOULD be theoretically desirable_ then it doesn't bring value to anyone.

## Or, rather than "_must_ not", should I say; "_will_ not"!

Application development teams will rightfully resist deploying version of the application that they cannot understand the contents of for fear of damaging the enterprise.

Users still stop using (and never _start_ using) applications that are more confusing than they are useful.

Managing complexity is a necessary pre-requisite to drive adoption and innovation.
 
## Conclusion

Therefore the most valuable rate of change that an application can have is a rate of change that matches what the enterprise (both the application developers and the users) can understand.

## Implication

Time should be spent _not only_ on *implementating* changes, but also creating ways to *monitor, test, and communicate* them.

*Specifically for developers* AI should not *only* be used to increase the rate at which they fulfill user stories; but should *also* be used to more thoroughly test changes and find creative ways to simplify how the application is understood to behave. _(I said "creative"... I don't want to get prescriptive here. You should be able to figure something out!)_

___
** *note:* Change is good, but *stability* is also valuable. Stability helps us understand _what_ something _is_. Change keeps it relevant.




