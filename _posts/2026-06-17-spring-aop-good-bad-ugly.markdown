---
layout: post
title:  "Spring AOP: The Good, The Bad, and The Ugly"
date:   2026-06-17 08:00:00 -0400
categories: programming
---

_My experience creating a custom annotation with Spring Aspect Oriented Programming_

## What is Spring AOP?

My experience with Spring's Aspect Oriented Programing is mainly the functionality that it gives me to write code that bookends method calls.

## Example of Spring AOP

For example, without Aspect Oriented Programming, if I wanted to surround a method call with logging statements, I'd have two options:

```java
// Option 1
log.info("Calling myMethod()");
myMethod();
log.info("Called myMethod()");

// OR Option 2
void myMethod() {
  log.info("Entering myMethod()");
  // ...
  log.info("Exiting myMethod()");
}
```

But **with** Aspect Oriented Programming, I could annotate a method, and the logging functionality could be implemented in the annotation.

```java
@MyLoggingAnnotation // <--- USING THE ANNOTATION
void myMethod() {
  // ...
}
```

That looks nice, doesn't it? But we're not done; we need to implement the annotation.

```java
// In another class...
@Target(ElementType.METHOD)
public @interface MyLoggingAnnotation {
// ...
}

// In yet another class...
@Aspect
@Component
class MyLoggingAnnotationAspect {
  @Around("@annotation(MyLoggingAnnotation)")
  public Object handleEvent(ProceedingJoinPoint jp) throws Throwable {
    log.info("Calling..."); // <--- ANNOTATION IMPLEMENTATION
    return jp.proceed();
    log.info("Called...");
  }
}
```

## Pros and Cons of AOP

As demonstrated by the example, there is a lot of plumbing that goes into creating an AOP annotation. Is it worth it? That depends on the developer's opinion of how much work is being done, and trading where the complexity lives. It might really appeal to developers (like me) who see two lines of code being repeated everywhere, but can envision a way to condense those two lines into one. _(But is that a big deal?)_

## Our use case: Monitoring Dashboard

We use a dashboard for monitoring our API's processing of webhook events that come from an ingestion service. It just so happened that we were in almost the exact scenario that I laid out in the above example; we were bookending method calls, sending logs that say:  

_"we're about to make a request with these parameters to such-and-such service..."_  
...  
_"we successfully got a response with this response body!"_

In my opinion, these glorified logging statements were muddying-up the domain logic of the code. So, with my team's permission (and with AI assistance), I started looking into our options, and eventually learned about and implemented this AOP approach. 

## The Journey

This isn't some hypothetical thing I'm thinking about doing, nor is it something I just implemented last week. I'm not hear to talk about a great successful refactor, and how smart we are on our team. No, we did this several months ago. It is a mature solution, and we have seen good things and bad things come of it.

### The good

1. We certainly have seen the benefit that our domain logic has less noise, and is less crowded with logging messages.
2. We immediately starting logging _more_ logs that we had accidentally overlooked up until this point.
3. Our logging was _more_ complete, accurately logging the entirety of the parameters and response.

### The bad

1. The annotation only works on method calls that _cross class boundaries_. We didn't realize this at first, and we weren't sending a few of our logging messages in production for a period of time. We were able to implement a solution to ensure this would never happen again, though, using ArchUnit (a testing library).
2. The way that the logging works _did not work_ for all types of parameters, and silent nullpointers were occuring, preventing some log messages from being sent. We had to handle this on a case-by-case basis.
3. Whether or not the NAMES of the parameters gets logged depends on how it gets compiled.

### The ugly

1. Because of these issues and limitations, usage of the annotation was not 100% adopted through the codebase, meaning that we have _multiple_ ways of sending logs to the monitoring dashboard.
2. Over time, the completeness of our logging began to degrade, because we start putting logic that modifies the request _inside_ the method that had the annotation.
3. Our logging was _too_ complete in some cases. (There were some cases where we didn't _want_ to log the entire response because it's enormous). Handling these on a case-by-case basis in an extremely abstracted solution felt way more complex than was appropriate for the use-case.
4. I wouldn't say that the team is 100% _comfortable_ with how it works. That's not to say that they don't _know_ how it works; it just feels a bit like a rube goldberg machine.

The ugliest thing of all; we have crossed over into this AOP way of doing things, and now we are _in it_. I have a mild anxiety about being stuck with it. Sure, we could always change it back the way it was, but I don't like making massive code changes; and _getting here_ was already a massive code change!

## Was it worth it?

This annotation isn't the worst thing in the world, but I'm not sure that I would go back and write it again. I'm honestly not sure if it was worth the effort.  
If it is of any value,  
If it does save us any time,  
If it spares us any complexity,  
Then it only does so marginally.

## My takeaway

Before implementing this solution, I talked it out with a few people. People who I look up to; people with alot of experience in the GAS Lab and beyond.  

One piece of advice I got beforehand was "Simpler tends to be better". I could tell my advisor was trying to dissuade me from implementing this complex solution.  

At the time, though, I rebuffed that advice, thinking the same thing that I already wrote above; that what's _really_ at stake here is deciding _where_ the complexity lives, no _whether_ it's complex or not. So it didn't exactly feel to me like this advice applied.  

But, in hindsight, I think my anxiety (which I mentioned above) has to do with meeting expectations. In other words; do people _expect_ me to write abstract solutions? Or do people _expect_ me to solve localized problems, even if in a onsie-twosie manner?  

So, when I'm working in a domain oriented product, I'll tend toward solutions that require the least knowledge of language/framework features.  

And I'll save the custom annotation authoring for when I'm explicitly working on developer tooling.  
