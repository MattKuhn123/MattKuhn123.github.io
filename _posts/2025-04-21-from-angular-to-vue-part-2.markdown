---
layout: post
title:  "From Angular to Vue (part 2)"
date:   2025-04-21 08:00:00 -0400
categories: angular vue
---
# From Angular to Vue (Follow up)

Four weeks into a Vue project as an Angular developer

I’m an Angular developer, and I was put on my first production Vue project as a staff aug four weeks ago. About two weeks in, I learned a lot about the Vue framework, but also had some lingering questions. Now, four weeks in, I have some new answers, realized I misunderstood a few things, learned some more cool stuff, and still feel that fundamentals are handy.

### Typescript vs Javascript (a big “facepalm” moment)

At my two week mark, I wrote that the Vue project was using vanilla Javascript, not typescript. Since then, I’ve noticed a few lines of code (*they are few and far between\!*) that look like this:

``` 
const abc: Ref<any> = ...

```

I also noticed the *tsconfig.json* file at the root level of the project. How did I never notice that? It appears that this project really does use typescript (*though sparsely\!*).

### Progressive Framework

I mentioned that the brand-new Vue project is meant to look-and-feel like an addition to an existing Thymeleaf project, and I wondered why the team chose to make a new project rather than drop Vue into the existing project.

Since then, I’ve learned that the Thymeleaf project isn’t *just* vanilla Thymeleaf. It’s also using a front-end framework called “Foundation” (*that I doubt anyone has ever heard of\!*). So, I now imagine that the reason a new project was made was because they didn’t want Vue and Foundation to be competing in the same project, and didn’t want to take on the effort of removing Foundation.

Not only that, but the Vue application targets an entirely different set of users with entirely different sets of permissions. Making a new application might have been the easiest way to handle splitting them.

### Web Components

I mentioned that the template and slot tags are not Vue constructs, but are web native:

``` 
<template>
  <slot #my-slot></slot>
  <slot #my-other-slot></slot>
<template>

```

Another developer offered a friendly tip that although these may be web native tags, Vue augments and enhances their functionality within the context of the framework. I still don’t have a deep understanding of exactly how that works, but I may take an interest later and do some digging into it\!

### Computed and ref

Vue has a concept of “*computed*” and “*ref*”. I see them frequently used in stores.

``` 
import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";

export const useEnrollmentStore = defineStore('enrollment', () => {
  const enrollment = ref({/* ... */});

  const isEnrolledInternally: Ref<any> = computed(() => {
    const isEnrolled = enrollment?.value.status === "enrolled";
    const isInternal = enrollment?.value.department === "internal";
    return isEnrolled && isInternal;
  });

  return {
    isEnrolledInternally,
  };
});

```

To me, they seem to be similar to a “getter” you might find in vanilla Javascript (or any other language).

``` 
class MyClass {
  enrollment;
  constructor(enrollment) {
    this.enrollment = enrollment;
  }
  
  get isEnrolledInternally() {
    const isEnrolled = enrollment.status === "enrolled";
    const isInternal = enrollment.department === "internal";
    return isEnrolled && isInternal;
  }
}

```

I appreciate that Vue’s “*ref*” feels almost like a primitive and doesn’t feel cumbersome to use.

### Observables?

In Angular, the famous *rxjs* library is used to make components reactive by using Observables. Is that library, with all of its sophisticated concepts, entirely replaced by little ol’ *ref?*

### Async/Await

As always, a solid foundation on vanilla Javascript is still handy. I applied my knowledge of asynchronous functions to help my team resolve a bug displaying a loading indicator.

**Before**

``` 
import {searchClient, searchContract} from '@/utils/http-services';

const loading = ref(false);

async function onClickSubmit() {
  loading.value = true;
  await searchClient(clientId).then((response: any) => {
    client = response;
    loading.value = false;
  });
  
  loading.value = true;
  await searchContract(contractId).then((response: any) => {
    contract = response;
    loading.value = false;
});
}

```

**After**

``` 
import {searchClient, searchContract} from '@/utils/http-services';

const loading = ref(false);

async function onClickSubmit() {
  loading.value = true;
  client = await searchClient(clientId);
  contract = await searchContract(contractId);
  loading.value = false;
}

```

**Explanation**

The team evidently had some confusion as to exactly what the **await** operator was doing, as shown by their use of the **then** clause, which is not meant to be used in conjunction with async/await functions. The loading indicator disappeared after the first asynchronous call completed, even though the second call was still running.

Since I had used it before (in previous web developer experience, not exactly with Angular), I understood how to refactor the function to get the results of the asynchronous calls, *and* get the loading indicator to disappear only after *both* calls completed.

### Conclusion

I’m still not a Vue expert, and I still have lingering questions. However, I have still been able to learn what I needed to learn in order to deliver value to my team and to the project. Over the coming months, I hope my value-driven approach to choosing what I learn will help me mature into a bonafide Vue developer\!
