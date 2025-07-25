---
layout: post
title:  "Guest contribution"
date:   2025-07-24 08:00:00 -0400
categories: programming
---
# Guest Contribution

## 3 tips for how to be a good steward of a codebase

### Assimilate

A codebase with consistent styles is easy to read. Apply whatever styles you observe in the legacy code in the new code that you write. By assimilating, you spare your fellow contributors from having to learn how to read your specific flavor of writing. Fortunately, IDE’s can automatically handle the simple stuff, like indentation and line length. However, there may be some things, such as design patterns, that will require your attention.

### Communicate

Don’t do anything you didn’t explicitly communicate you would do (and got approval to do). As you work on your task, you may come across unrelated issues that you find tempting to knock-out. Hold yourself back from making spontaneous changes like this because:

  * **It’s impolite** - what if it’s just a matter of opinion, and someone else liked it the way it was before you changed it?
  * **It’s risky** - what if you don’t know all the context, and your change causes an issue?
  * **It’s difficult to track** - how can the team tell if the issue was fixed if it’s buried in an unrelated changeset or commit?

If you feel that you’ve come across code that you feel must change for any reason, take care to communicate with the team, and go through whatever change management process they have.

### Compassionate

It can be frustrating when you come across a module that does not suit the needs of (or is not maximally extensible for the purposes of) the new task you’re working on. Don’t spend too much time getting worked up about how bad that module is. In any case, you need to work with whatever code is already there.

It may help your peace-of-mind to remind yourself that you don’t know the circumstances under which the previous developers had to deliver; whether they had to crunch under harsh time constraints, whether they lost valuable members of their team, or whether they had unclear requirements to work with. Have compassion (or pity\!) for those poor saps and do your best to work with what they passed down to you\!

### Bonus tip - who is a guest contributor?

Unless you are working on a toy project, you are a guest contributor\! Your codebase is not your own, but belongs to the team. If you are a one-man team, then it at least belongs to past and future contributors. If, despite all this, you feel that the codebase *does* belong to you, then stay tuned for a future article describing how to be a gracious host contributor (with tips that might look suspiciously like those laid out in this article)\!
