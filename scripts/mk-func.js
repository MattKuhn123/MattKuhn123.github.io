(() => {
  const on = (element, type, selector, handler) => {
    element.addEventListener(type, (event) => {
      if (event.target.closest(selector)) {
        handler(event);
      }
    });
  };

  on(document, 'input', 'form', (event) => {
    const form = event.target.closest("form");
    const elt = form.querySelectorAll("[mk-func]");
    Array.from(elt).forEach(function(elt) {
      const func = getFunc(elt.getAttribute("mk-func"));
      const argNames = elt.getAttribute("mk-args");
      const argEls = argNames.split(",").map(x => form.querySelector("[name=" + x + "]"));
      const argVals = argEls.map(x => oneMinus(x) * negate(x));
      elt.value = func(argVals);
      elt.dispatchEvent(new Event("change", { bubbles: true }))
    });
  });

  function negate(x) {
    return (x.hasAttribute("mk-negate") ? -1 : 1);
  }

  function oneMinus(x) {
    const result = Number(x.value);
    if (x.hasAttribute("mk-one-minus")) {
      return 1 - result;
    }
    
    return result;
  }

  function getFunc(func) {
    switch(func) {
      case "multiply": return multiply;
      case "sum": return sum;
      default: throw new Error("Invalid func: " + func);
    }
  }

  function multiply(args) {
    return args.reduce((a, b) => a * b, 1);
  }

  function sum(args) {
    return args.reduce((a, b) => a + b, 0);
  }
})();