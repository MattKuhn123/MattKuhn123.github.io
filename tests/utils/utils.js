function assertTrue(expected) {
  if (expected !== true) {
    throw new Error(`expected: ${expected} is not true`);
  }
}

function assertEquals(actual, expected) {
  if (actual !== expected) {
    throw new Error(`actual: ${actual} does not equal expected: ${expected}`);
  }
}

function assertDefined(actual) {
  if (actual == undefined) {
    throw new Error(`actual: ${actual} is undefined`);
  }
}

function assertElementExists(selector) {
  const elt = document.querySelectorAll(selector);
  assertTrue(elt.length > 0);
}