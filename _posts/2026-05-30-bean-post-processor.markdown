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

  ```
  Simulate-Error-Path: /payments/submit
  Simulate-Error-Status: 503
  ```

  Send that header on any request → the app stubs that outgoing call.

  ---

  # How it works

  1. At startup, **BeanPostProcessor** finds every `WebClient.Builder` bean
  2. It attaches a **FilterFunction** to each one
  3. On every outgoing request, the filter checks:
     - Is there a `Simulate-Error` header on the *incoming* request?
     - Does the outgoing path match?
  4. If yes → return a stubbed response with the given status code

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

  - Works in dev, staging, or prod
  - No mocks, no Wiremock, no environment-specific config
  - Any team member could use it with a single header

  Our QA team went from *"we can't really test that"* to full error coverage.

  ---

  class: title-slide

  # Takeaways

  - `BeanPostProcessor` is a powerful hook for cross-cutting concerns
  - `FilterFunction` makes WebClient behavior easy to intercept
  - The best test tools feel invisible to the app

  .footnote[Questions?]
---
