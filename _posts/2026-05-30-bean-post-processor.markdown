---
layout: slides
title: "BeanPostProcessor"
date: 2026-05-30
slides: |
  class: title-slide

  # BeanPostProcessor

  ### How we gave QA a self-service error simulator

  .footnote[Matt Kuhn — 2026]

  ---

  # The problem

  QA needed to test how our app handles upstream errors.

  - Upstream services are outside our control
  - We couldn't reliably trigger a `500` or `404` on demand
  - Mocking at the test level didn't cover real runtime behavior

  > "Can you make it return a 503 so I can test the retry logic?"

  ---

  # The idea

  What if the app could simulate errors *itself*, triggered by a request header?

  ```http
  POST https://our-app/api/do-something
  Content-Type: application/json
  Simulate-Error: /api/contract-get:500

  { "foo": "bar" }
  ```

  Send that header on any request → the app stubs that outgoing call.

  ---

  # How it works

  1. At startup, **BeanPostProcessor** finds every `WebClient.Builder` bean
  2. It attaches a **FilterFunction** to each one
  3. A servlet filter reads the incoming `Simulate-Error` header and stores it in a **ThreadLocal**
  4. On every outgoing request, the FilterFunction reads from that ThreadLocal:
     - Does the outgoing path match?
  5. If yes → return a stubbed response with the given status code

  No restarts. No config changes. Just a header.

  ---

  # The code

  ```java
  @Component
  public class ErrorSimulatorPostProcessor implements BeanPostProcessor {

      @Override
      public Object postProcessAfterInitialization(Object bean, String beanName) {
          if (bean instanceof WebClient.Builder builder) {
              builder.filter(errorSimulatorFilter());
          }
          return bean;
      }
  }
  ```

  The filter reads the incoming request headers from a request-scoped bean,
  then short-circuits matching outgoing calls with the specified status.

  ---

  # The result

  QA could trigger any error scenario without touching infrastructure.

  - Works in dev and UAT — disabled in prod
  - No mocks, no Wiremock, no environment-specific config
  - Any team member could use it with a single header

  Our QA team went from *"we can't really test that"* to full error coverage.

  ---

  # Isn't this just Wiremock?

  Kind of — and that's a good sign.

  Wiremock sits *outside* the app and intercepts HTTP at the network level.
  This sits *inside* the app and intercepts at the WebClient level.

  - Same idea: stub a response for a given path
  - Different tradeoff: no extra process, but only covers WebClient calls
  - Feels familiar if your team already uses Wiremock

  ---

  # Tradeoffs

  Like any stub, this only tests *your* error handling — not the upstream service.

  **What you gain**
  - Fast, zero-infrastructure error simulation
  - Available in dev and UAT without any extra setup

  **What you give up**
  - You're not testing the real network path
  - A stub can't catch upstream changes you didn't anticipate

  Same tradeoff as Wiremock, a mock, or any other test double.

  ---

  class: title-slide

  # Takeaways

  - AI is a great way to learn about unfamiliar APIs — I didn't know what a `BeanPostProcessor` was before this
  - Improving your team's testing experience is worth engineering effort
  - A good DX for QA pays off every sprint

  .footnote[Questions?]
---
