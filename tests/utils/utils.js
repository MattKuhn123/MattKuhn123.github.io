function assertTrue(expected) {
  console.assert(expected === true, `expected: ${expected} is not true`)
}

function assertEquals(actual, expected) {
  console.assert(actual === expected, `actual: ${actual} does not equal expected: ${expected}`)
}

function assertDefined(actual) {
  console.assert(actual != undefined, `actual: ${actual} is undefined`)
}

function assertElementExists(selector) {
  const elt = document.querySelectorAll(selector);
  assertTrue(elt.length > 0);
}