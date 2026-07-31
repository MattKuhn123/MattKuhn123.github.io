---
layout: post
title:  "Writing automated integration tests in CI"
date:   2026-07-31 08:00:00 -0400
categories: programming
---

My foray into integration testing started when AI enhanced my team's delivery speed. Our work-intake process didn't initially keep pace, so our increased delivery speed translated to more free time.

For many, this new free time was spent "verifying" AI code. 

"Verifying" code can be tedious, especially due to the mountainous volume of code that AI can generate.

Look, we're professionals; tedium does _not_ excuse us from attending to our duties.

But we're also tinkerers and thinkers, so I got to tinkering and thinking.

For me, one thing I noticed about "verifying" code was that I cared *less* about AI's adherence to what we in the community call "clean" code. To some degree, I didn't want the code to be a mess, but I also know that all code eventually becomes a "giant turd ball," anyway. To quote Dale Gribble, I felt that my code-reading verification needed only go so far as to "make sure my air is clean and that my food has only an _acceptable_ amount of rat feces in it".

My new way of thinking became something like: _"Who cares if I read every line of code to verify that the DRY principle wasn't violated. Doesn't it matter more if it does what it is supposed to do? What's the best way to verify **that**?"_

So I started to think of the code almost as a black box.

In testing terminology: I started to think of the _application_ as a unit (as opposed to the java classes that the application is composed of).

So, to recap; at this point, I'm focusing on writing integration tests for my application, and aiming for an automation scheme. And this is where my journey really starts.

## Undermining classic unit testing

I felt like I needed to demonstrate to my team why I wanted to shift my paradigm.  

We've always had a problem of introducing regressions. Unit tests aren't perfect, and if you write mocks that don't mimic the _real world_ behavior (or don't keep up with it) then they're worse than worthless; they're deceptive!  

So I called a meeting with the technical and non-technical members of the team to demonstrate a toy application with 100% test coverage and with real meaningful tests with _obscure_ mocking issues. I showed a sneaky bug, I showed fixing that bug and updating the tests, I showed perfect test coverage, and I showed how that all created a NEW bug that snuck through undetected.

I made my case; that unit testing is fine, but it's not enough and we can do better.

## Setting the groundwork for automation; how to seed and reference test data

The first hurdle for automating integration testing was finding a way to seed test data in our domain. 

The main part of our domain is **clients** making requests to submit **contracts**, where the validation and workflow for the contract submission is based largely on how the client was configured internally. The way that the contract submission was associated with a client was by the authentication that was used to submit the contract; and the limitation was that we only had one set of credentials! That meant we could only test **one client configuration at a time!** We had a tremendously manual process of testing a certain client configuration, and manually editing that client configuration using an admin tool web interface.

So there's our first hurdle; to make it so that you can **seed** client configuration on-the-fly, and to be able to "impersonate" that client for testing purposes. 

I'm pleased to say that we were able to solve that problem in our domain! We decided it would make sense if the contract submission request had a unique property on it, a Client-Proxy HTTP header, and if the application would have special behavior based on that header. 

Problem solved!

## Choosing an automation framework

You can write automation tests however you want. Any idiot could do that.

But can you automate it in a way that people find _useful_??

I might draw a comparison to Rube Goldberg machines. These overcomplicated monstrosities automate simple tasks that are completely impractical; like lifting a fork to your mouth by using pulley systems, dominoes, and catapults.

So let's say I find out some "framework" for automating tests. Will it be worthwhile? I have to apply a pragmatic engineering perspective.

At a high level, this framework needs to run the following phases:

1. Seeding test data.
2. Executing a series of HTTP requests and making assertions.
3. Cleaning up the test data.

### Postman

I must have automated about 20 user stories with about 2-4 test cases each. It was tremendously difficult and slow, but I could afford the time.

I ended up with a framework where a postman collection represented a single test case. The collection was divided into folders, where each folder corresponded to each phase.

**Pros**
- My team already knows how to use Postman and uses it for manual testing.
- Along those same lines; it lays out the test in a way that is familiar to my team.
- It has a user interface that helps guide you through the process of making HTTP requests.
- Comes with testing utilities `pm.test` and `pm.expect`.

**Cons**
- Need to understand how to use the CLI to run tests in an automated fashion.
- There is a license fee.
- It's so bulky! You have to click through so many tabs to see the request properties and the tests.
- No great way to handle variables.
- You have to write your Postman collections differently for automation scripts than you would for manual execution, which is mildly confusing (for non-technical people).

**Conclusion**

In the end, I found postman extremely cumbersome. And even after having automated so very many test cases, and even though I shared my progress with the other developers on the team, my technique was not gaining adoption. No one else wanted to write test cases this way, and no one really cared that I was doing it.

(Technically, I suppose that's not really a reason to _stop_ doing it, because once again, I'm just experimenting with superior ways to "validate" AI code. But I have dreams of making this more than just that).

### HttpYac

_HTTP Yet-Another-Client_! I found this library and fell in love with it quickly. It solved the "cumbersome" problem that I felt postman had.

HTTP Requests are represented in text-based `.http` files. I found this far simpler and far easier to navigate than Postman's interface. It includes the ability to write node scripts, too, which can be used for writing tests. There is also short-hand notation for writing tests using double question-marks which I think is eloquent. 

**Pros**
- Simple syntax.
- Easy to navigate text-based files.
- Comes with testing utilities.
- Free!
- Based on Node, easy to write supporting scripts (if needed)

**Cons**
- Need to learn syntax (even though it's simple)!
- No one on the team uses it, no one is familiar with it.

**Conclusion**

I loved this solution, but, still, no one else on the team adopted it. It wasn't for lack of trying! Every time I reviewed code with them, I always showed them the automation script that I wrote. They were happy for me that I found a solution that I liked, but they still didn't want to adopt the strategy themselves.

### Nothing is working. Why not??

So now I've had two strong solutions that I've had to pass over. My peer developers on the team didn't want to adopt my framework, and my PM/PO don't see it as a value-add for them, either. 

Well, until now, I haven't told you some of the issues I've been having with these automation tests.

- They're somewhat flakey (mainly due to timing and race conditions).
- They raise false alarms.
- They take forever to write.
- It's hard to tell exactly what they're testing sometimes (despite my best efforts to write clear tests).
- There's no easy way to find them!! Where are they, how do I run them, how do I see what they are...??
- They don't prevent issues; only discover them (at inconvenient times, too...)
- There's the matter of trust... How do I know that these automated tests don't do anything unexpected? How do I know they'll properly clean up the test data they create? How do I know I'm running them correctly? A reasonable person would want more assurance than biased anecdotes from the creator.
- **They're out-of-sync with the actual _application_. They don't live in the code, and they don't run in the CI/CD pipeline**.

### Postman again; but in the smoke-tests phase of the pipeline

So I need to try to solve some of these problems.  

It turns out that our platform operations team has a phase during the CI/CD pipeline where we can run custom smoke tests.  

I get that this might not be the best place to run a full-blown regression testing suite (which is essentially what I had at this point) but I figure maybe we could still get a win here by selecting a few critical tests and running them here.  

I have to go through a lot of iteration to understand the environment I have around me for executing these tests in; mainly centering around the authentication credentials that are injected. In the end, I end up having to meet with a senior architect to get help.  

Well, if you've ever met with a senior architect as a lowly developer, you know that can go sideways sometimes! The main issue is that you're totally opening up your codebase and your aspirations for criticism; even nit-picky criticism.  

We engaged in a bit of what I now affectionately refer to as "intellectual sparring".  

**Intellectual sparring**

Sometimes, smart people disagree with each other. Sometimes, they're passionate. Sometimes, they say somewhat rude or dismissive things. Sometimes, a little bit of an impassioned back-and-forth is necessary for each side to gain a respect for the other. At least, that's the way I feel now. At the time, I was highly annoyed!  

I needed help from this senior architect to ensure that the credentials that were injected in my environment had a certain authority so that it could use the "Client-Proxy" header (mentioned way earlier in this article). The senior architect was skeptical that I knew what I was talking about, and flat rejected my request. I immediately asked him to call me. When he did, we had a bit of a laugh about it, and went on to solution the problem together. It was productive!  

**The smoke tests don't take off like I envisioned**

So, in the end, I got what I wanted; the ability to use the custom-smoke-tests phase to run arbitrary requests against my API. 

But I was like a dog that finally caught the car; now what?? 

I can either program it so that smoke test failures would fail the deployment; but that seemed like a bad idea, because they're flakey sometimes. 
But on the other hand, if I mute the test failures, then no one will know about them, anyway! I pitched the idea to my team that _maybe_ we could get some kind of reporting on it, but that didn't really go anywhere. No one expressed interest, and I wasn't sure if it was possible anyway.


### Back to the drawing board again!

So, no problems are solved.  

I got no traction on the postman testing framework, nor the httpyac testing framework, and the custom-smoke-tests are just a bad idea.  

Well, around this same time, I decided to engage _another_ senior architect about a tangential issue. I wanted to talk to him about _why_ no one in my department (of approximately 50 developers, maybe more) is comfortable seeding data the way that I had grown to be.

_This_ senior architect was very willing to sit down and discuss anything and everything. I talked to him about everything that I had tried up to this point.  

He seemed to _already_ have this mentality of seeing the application, itself, as a "unit" (and it seemed to me that his attitude pre-dated AI).  

He was well beyond where I was!  

### Capture/Mock

His strategy is to write these integration tests _into the application's tests_ and embed them in the CI/CD pipeline. The linchpin of his operation was "test doubles" (something that I saw him refer to as capture/mock). His strategy is to write tests and _capture_ all of the HTTP activity. Once captured, they can be replayed in _mock_ mode so that they'll work in the CI/CD pipeline.  

So, just to clarify; he runs his application as though he were running it normally, locally, and his unit tests hit the application's real HTTP APIs.

Well, this is exactly what I've been trying to get to do!

He worked closely with me from that moment forward, assisting me with writing the code and configuration that could execute this capture/mock strategy.  

**It wasn't all seashells and balloons**

Over the course of our cooperation, he discovered some issues in our codebase, too.  

The main issue he discovered was that our application has what he calls "YAML hell" where our environment properties are split over so many disparate files, its hard to keep them straight. He wanted to clean them up, but I wanted to touch them as minimally as possible to minimize the blast-radius of our changes and keep making fast progress on the testing front.  

In the end, his goal was just to help me as much as I wanted him to and as much as he could. So what if he caught a glimpse in a skeleton in our closet, right??  

### Conclusion

With the help of this senior architect, and with the capture/mock strategy, I was able to write automated integration tests directly inside the application's test source code that run in the CI/CD pipeline and prevent issues before they happen. 

I solved many of the problems that I set out to solve:

- Writing tests that treat the _application_ as a unit.
- Treating the application as a black box.
- Verifying the AI code by writing quality tests, not by reading mountains of code.
- Embedding quality assurance in the CI/CD pipeline.
- Preventing regressions from sneaking into builds.
- Requiring as little technical knowledge as possible.
- Keeping the tests discoverable by co-locating them with the application.

I did NOT achieve my goals of:

- Writing the tests in a non-technical format that even non-technical people would understand.
- Creating a new framework that others would want to adopt (because, in the end, I personally adopted someone else's framework).

My aim, all along, was to find ways to serve the team with the extra time in the day that I have.  

In the end, I learned a new technique of testing that is beneficial whether I continue to use AI to write all of the code or not!

