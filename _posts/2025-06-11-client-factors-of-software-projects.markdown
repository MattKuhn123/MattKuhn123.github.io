---
layout: post
title:  "Client factors of software projects"
date:   2025-06-11 08:00:00 -0400
categories: projects
---
# Client Factors of Software Projects

Buy-in, demonstration & feedback, and support

To be successful, a project team must earn their client’s buy-in, engage with them during the development process, and continuously support them in production. I’ve been on teams that are great comparative examples of how these challenges can make or break a product.

## 1\. Buy-In: Building the Right Thing

For a heads-down development department that just wants to write code and ship a product, earning client buy-in can be an easily forgotten step.

I once had a client that was using an out-of-support VB.NET application. A well-meaning and skilled development team came along and built a beautiful web application that had a brand-new UI, geolocation, and other state-of-the-art features. However, it never got to production because the client didn’t want to learn how to use it. Years later, my team pitched the suggestion to re-write the original VB.NET application beat-for-beat, which the client agreed to. We were able to deliver that, then suggest tweaks and improvements afterward. The previous team’s application may have been technically superior, but it wasn’t what the client wanted.

**Lesson:** Success starts with understanding and respecting what the client values; then earning their buy-in.

## 2\. Demonstration & Feedback: Course-Correct Early & Often

To keep the project on track, the development team must continuously engage the client with demonstrations and receive feedback.

I once had a client whose work almost never allowed them to be in the office. My program manager was only able to establish a demonstration with them once per two weeks, which always entailed a laundry list of change requests afterward. On one occasion, we missed a feature so badly, that we crammed a dozen hours of work over a weekend to make sure we still shipped on time\! I didn’t realize the significance of this issue until years later by comparison with another client. This client was involved in our daily standup, and we had multiple other meetings with them throughout the week. I’m sure it consumed a lot of the client’s time, but it was well worth it from my perspective.

The development team can shoulder the burden of the clients’ time investment by shadowing them. This helps the team learn about the client so they can anticipate what the client would want, and will therefore require less client involvement.

**Lesson:** Frequent, collaborative touchpoints improve accuracy and trust, and reduce rework.

## 3\. Support: The Real Test Comes After Launch

Production is where the rubber hits the road. A successful project may require the development team to support or train their clients on how to use it. This lets them know what to expect and prevent issues from arising.

I once had a client who was confused about how to install the latest version of our web application. (There was some quirky behavior having to do with caching.) This issue never came up in demonstrations or other discussions because we always handled that in our pre-meeting preparation\! After the issue arose in production, we worked with the client to explain the steps to get the latest version. In retrospect, we wished we had trained them how to handle this situation ahead of time. (We eventually refined the process to make it more user-friendly anyway.)

On another occasion, I worked on an application that stored large amounts of data. We knew we’d be storing a large amount, but the client’s workflow surprised us when we learned that they wouldn’t offload the data into the storage system until they’d accumulated an entire year’s worth of data - far more than we anticipated\! The system’s performance suffered until we were able to get on a call with them to explain the situation and arrange for them to offload the data more frequently. We spent a considerable amount of time designing features to accommodate frequent offloads, and the client knew about the features, but we never made it clear to the client the frequency with which we expected them to use it. Again, we wished we had trained them on this issue in advance.

**Lesson:** Effective support is about more than resolving issues; it’s about empowering clients with the knowledge they need.

## Final Thoughts

I’ve learned some of these lessons the hard way\! But my experiences have made me look more sharply for the interests of the client. I’ve learned to prioritize client buy-in, continuous engagement, and support in my software projects.
