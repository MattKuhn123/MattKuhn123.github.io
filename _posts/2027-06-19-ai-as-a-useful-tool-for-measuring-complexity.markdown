---
layout: post
title:  "AI as a useful tool for measuring complexity"
date:   2027-06-19 08:00:00 -0400
categories: programming
---

I wonder if there is an association to be made between how complex a module is, and how many tokens would be spent to modify it in any given way.  

The user's ability to efficiently use tokens would obviously be an influential factor in how many tokens get spent; but that actually makes sense. Although there are some objective elements to complexity, it might be fair to say that it is at least partially subjective; each person may have their own opinion about how complex the same module is, and each person would approach that module differently. The way they approach working on a module would drive how they work with the AI, and that would be reflected in token usage.

So token expenditure might be based on at least two things; the nature of the *module*, and the nature of the *human* working on the module.

I wonder how greatly token usage could vary between different humans doing the same task on the same module. Let's say that both humans have the same development environment, same AI model, same everything. Neither human is allowed to write code; only prompt the AI to make code changes, which the human can approve or deny. 

Would it be fair to say that the human who uses fewer tokens had a superior way of working on the module? Possibly yes; if all things are equal, and token usage is the only thing measured, and token usage costs money, and we want to spend less money, then *yes* the approach that uses fewer tokens is the superior approach.

But what about speed of completing the task? What if one human found a way to automate their interactions with the AI and can complete the task in half the time, but it's kind of brute-force and is heavy on the token usage?

So there are at least two things we might care about when using AI to execute tasks: *token usage*, and *time to completion*.

Is there a way of working with the AI that minimizes technical growth, while also maximizing token and time efficiency? That might not be a fair challenge; because wouldn't we say that maximizing token and time efficiency is an avenue of technical growth? I guess it depends on what we mean by "technical". The human might sacrifice their opportunity to learn how to do what the AI has done for them, but they *have* learned how to use the AI to do things for them. That always the trade-off with any tool, I suppose. I might say that a generation that has grown up with only power tools may never be able to properly use a manual tool. Tough times make for tough people. Tough people make for fat times. Fat times make for fat people. 

The pendulum swings.

Let's not go too far down the philosophical rabbit hole.

My main curiosity is whether module complexity can be measured in how many tokens might be theoretically spent to modify it. 

Now, I can clearly see that we'd want to control for:
1. The technical ability of the human working on it *(could possibly just be the same human, for convenience sake)*.
2. The nature of the task.
3. The nature of the module.
4. (Possibly even the language the module is written in?)
5. The tools that can be used.

And what I'm most interested to learn is what results in the least tokens spent (I shall ignore how long it takes to work on it and whether or not the human experienced personal/professional growth).  

Is it:
1. The length (in characters) of the module.
2. The length (in statements/lines) of the module.
3. The cyclical complexity of the module.
4. Possibly how the human chats with the AI?
