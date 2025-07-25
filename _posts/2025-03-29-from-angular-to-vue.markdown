---
layout: post
title:  "From Angular to Vue"
date:   2025-03-29 08:00:00 -0400
categories: angular vue
---
# From Angular To Vue

Two weeks into a Vue project as an Angular developer

I’m an Angular developer, and I was put on my first production Vue project as a staff aug two weeks ago. I was excited to dig into Vue because I’ve heard that it’s been gaining favor over Angular in the web development community. I did some research beforehand to prepare myself for what differences I might see, but there’s really no way to know until the rubber hits the road. The following are what I’ve found to be the most notable comparisons.

1.  Components
2.  Javascript and Typescript
3.  Dependency Injection
4.  Web Components
5.  Fundamentals

## Components

In Vue, the default component is an SFC (single file component) where the html, css, and script are all in one file. This *can* be done in Angular by defining inline templates and styles, but I like Vue’s approach because it feels like you are writing raw html by using the actual html tags for the script and style sections.

``` typescript
// app-component.component.ts (an Angular SFC)

@Component({
  selector: "app-component",
  imports: [ ... ],
  styles: [ ... ],
  template: `<p>Hello, world!</p>`
})
export class AppComponent { }

```

``` html
<script setup>
  import ... from '...';
  </script>

<template>
  <p>Hello, world!</p>
</template>

<style scoped>
  </style>

```

## Style

Both frameworks can scope styles to the component level. This is the default behavior in Angular. In Vue, the **style** tag must have the **scoped** attribute. I wonder: why would I ever *not* want this behavior? In what circumstance would I not use that attribute? Perhaps when a child component should have the same styles as their parent?

## Javascript and Typescript

While Angular requires typescript, Vue uses javascript by default\! That surprised me because I would think that a project complex enough to need a framework is surely also complex enough to need typescript. In other words, if a project is so complex that it needs to be split into components, then surely it would be necessary to also be able to define the objects as types in as well.

In the case of my project, it’s javascript\! I’m surprised the team didn’t choose typescript, because there are complex objects with over a dozen properties and several layers of nesting. I’m not sure whether it is feasible to add typescript to an in-flight project, nor if the team would be interested in doing so.

## Progressive Framework

Vue describes itself as a “progressive” framework, meaning that it does not necessarily drive the project structure. Vue can be added to a project that was already created. Angular projects, on the other hand, must be created as Angular projects.

I suppose a benefit of Vue’s flexibility with the underlying language is that it enables it to be a “progressive” framework. But I wonder: is the “progressive-ness” of Vue really that attractive?

My project was initialized as a Vue project. It’s meant to look-and-feel like an addition to an existing project that was created with Thymeleaf. The team hypothetically could have chosen to progressively add Vue into the existing Thymeleaf, but they chose not to. I wonder why not? And if it’s not attractive to do it in *this* case, then when would it be?

## Dependency Injection

Dependency injection in Vue is not like what I’ve seen in Angular, .NET, and others. While those languages define their dependencies using constructors, Vue appears to do it implicitly. By that, I mean that the **imports** at the top of the file *are* the dependencies. (This admittedly makes sense. I can see an argument that declaring it in the constructor is redundant.).

## Unit Testing

### Layout

Vue’s unit tests are **it()** functions inside of **describe()** functions, just like what I saw in Angular.

``` javascript
describe("HomeComponent", () => {
  beforeEach(() => { ... });
  it("Should render the title", () => { ... });
}

```

### Mocking/Stubbing dependencies

Unit tests for an Angular component that uses a service to make an http request would most likely use a **partial** for that service to stub the http request.

``` typescript
// Angular

const partial: Partial<MyService> = {
  getFromHttp: () => of({ ... });
}

// ...

providers: [ { provide: MyService, useValue: partial} ],

// ...

```

The same thing happens in Vue, but the implementation is different. In my project, the team has established a pattern of mocking functions one-by-one like so:

``` javascript
// Vue

import { Mock } from "vitest";
import { getFromHttp } from "@utils/service.js"

// ...

vi.mock("@/utils/myHttpClient");
const mockGetFromHttp = getFromHttp as Mock;

// ...

mockGetFromHttp.mockResolvedValue({ ... });

```

## Web Components

When I first saw them, I mistook the **template** and **slot** html tags as parts of the Vue framework. Eventually, I realized that those have nothing to do with Vue, but are used for native web components\! Vue considers itself a complimentary technology with native web components.

I think it’s great that Vue blends with web components. Maybe it is a step toward merging the functionality of javascript frameworks into the web browser natively?

## Fundamentals

Mastery of fundamentals is useful for both Angular and Vue. I’ve helped resolve several issues in the project by applying my knowledge of vanilla javascript and good module design.

For example, on one occasion, I fixed a bug by removing a mutating function. I removed it by replacing it with an aggregation that returned a new value, rather than overwriting the existing value. The code sample is below:

``` html
<script>
modifyValsForDisplay(arr) {
  // arr.forEach(x => {
  //  x.val = x.val.split(";").join("\n"); // Mutates val!!
  // });
  // return arr;

  return arr.map(x => { // Returns new array without mutating the original
    return {
      val: x.val.split(";").join("\n");
    }
  });
}
</script>

<template>
<div v-for="item in modifyValsForDisplay(myArray)">
  {{ item.val }}
</div>
<div v-for="item in myArray">
  {{ item.val }} </div>
</template>

```

## Conclusion

I was excited to get to work on a Vue project as an Angular developer so that I could see for myself why Vue has gained favor over Angular in the web development community. In this real-world scenario in a production application, I discovered some subtle differences that could strongly play to individual taste, and that many concepts translate directly.

I appreciate that Vue’s design philosophy tends to make the project smaller, but miss the expressiveness of Typescript.

Two weeks is a short time. Perhaps I’ll find significant differences in state management, reactivity, or the frameworks’ larger eco-system of libraries. I’m looking forward to continuing my dive into Vue and getting a better perspective\!
