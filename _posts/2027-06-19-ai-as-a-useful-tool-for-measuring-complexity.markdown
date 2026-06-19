---
layout: post
title:  "AI as a useful tool for measuring complexity"
date:   2027-06-19 08:00:00 -0400
categories: programming
---

I wonder if there is an association to be made between how complex a module is, and how many tokens would be spent to modify it in any given way.  

The user's ability to efficiently use tokens would obviously be an influential factor in how many tokens get spent; but that actually makes sense. Although there are some objective elements to complexity, it might be fair to say that it is at least partially subjective; each person may have their own opinion about how complex the same module is, and each person would approach that module differently. The way they approach working on a module would drive how they work with the AI, and that would be reflected in token usage.

So token expenditure might be based on at least two things; the nature of the module, and the nature of the human working on the module.

But I'm interested in the question of whether there is a relationship between tokens and complexity, so let's control for human ability.

What might drive token expenditure for modifying a module?

- The size of the module? This is easy to measure. We can count the characters, lines, words, etc.
- The complexity of the module? This is extremely subjective and context-dependent. 

I would love to find that complexity is the main driver of token cost. I would love to discover that more complex modules are more expensive to maintain.

But that's not what that discovery would mean.... What about complex modules that change infrequently? That would not be expensive because it would rarely incur costs.
