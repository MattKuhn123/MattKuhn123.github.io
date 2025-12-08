---
layout: post
title:  "Tradeoffs"
date:   2025-12-04 08:00:00 -0400
categories: work
---
# Tradeoffs

Given this unimplemented JavaScript function for getting the min, max, and sum of an array of numbers:

```javascript
/**
 * @param {number[]} numbers
 * @returns { min: number, max: number, sum: number }
 */
function stats(numbers) {
  // TODO: implement
}
```

This tests should pass:

```javascript
describe("stats", () => {
  it("should give a result of { min: 1, max: 10, sum: 13 } for an input of [ 1, 2, 10 ], ", () => {
    const result = sum([1, 2, 10]);
    expect(result.sum).toBe(13);
    expect(result.min).toBe(1);
    expect(result.max).toBe(10);
  }
}
```

Given the choice between these two implementations, which would you prefer to see in your codebase?

## Option 1

```javascript
const sum = numbers.reduce((total, num) => total + num, 0);
const max = Math.max(...numbers);
const min = Math.min(...numbers);
return { min, max, sum };
```

## Option 2

```javascript
let sum = 0;
let min = numbers[0];
let max = numbers[0];
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
  if (min > numbers[i]) {
    min = numbers[i];
  }

  if (max < numbers[i]) {
    max = numbers[i];
  }
}

return { min, max, sum };
```

In general, important considerations when writing any unit of code are:

- **Correctness**: because our application should provide the correct output!
- **Simplicity**: because we want the code to be easier for future developers to understand.
- **Efficiency**: because we always want our application to run quickly for a better user experience.

### Correctness

Both of these implementations are correct! So they are both acceptable.

### Simplicity

Which code sample is simpler?

If the reader is familiar with collections and data structures, and if the reader has learned what the **reduce** function does, the first code sample is simpler. It's simpler because it follows the principle of immutability, where each variable is only assigned once. While code like that is occasionally harder to write, it usually easier to read since there is less activity to keep track of.

However, if the reader is unfamiliar with collections and data structures, and if the reader is new to JavaScript, then they might find the second code sample simpler.

### Correctness - revisited

Now that we have touched on simplicity, let's take another look at correctness.

All code is destined to change as the world around it changes. When the time comes to change _this_ code _(for whatever reason that might be)_, will any of the adjacent functionality break?

Simpler code tends to be safer to change, so I might suggest that there is a correlation between simplicity and correctness _over time_. Considering this, the first sample might be a bit better.

### Efficiency

Which code sample is more efficient?

The first code samples has a time complexity of O(3n) since it iterates over the array up to three times. The second code sample has a time complexity of O(n) since it iterates over the array only once.

But is efficiency an important consideration for your codebase? Are large amounts of data passing through it?

## Tradeoffs

Engineering problems aren't really about choosing the "_right_ or _wrong_" option. They are about making the best choice you can with the limited resources that you have.

In this case, our limited resources are developer expertise and computation time.

In this context, we have to know who our developers are, and how much data pass through the system. If we knew those two things, we could make our best, though still imperfect, decision.
