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
    const elt = form.querySelectorAll("output[mk-func]");
    Array.from(elt).forEach(function(elt) {
      const func = getFunc(elt.getAttribute("mk-func"));
      const argNames = elt.getAttribute("for");
      const argElts = argNames.split(" ").map(x => form.querySelector("[name=" + x + "]"));
      const argVals = argElts.map(x => getElementValue(x));
      const dataValue = func(argVals)
      elt.setAttribute("data-value", dataValue);
      elt.dispatchEvent(new Event("change", { bubbles: true }));

      const maskFormat = elt.getAttribute("mk-mask");
      const maskFunc = getMaskFormatter(maskFormat);
      const maskedValue = maskFunc(dataValue);
      elt.innerText = maskedValue;
    });
  });

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

  function getElementValue(x) {
    let value = x.tagName.toLowerCase() === "input" 
      ? Number(x.value) 
      : Number(x.getAttribute("data-value"));
    value = x.hasAttribute("mk-compliment") ? 1 - value : value;
    value = x.hasAttribute("mk-negate") ? -1 * value : value;
    return value;
  }

  function getMaskFormatter(mask) {
    switch(mask) {
      case "currency": return currency;
      case "percentage": return percentage;
      default: return noMask;
    }
  }

  function noMask(value) {
    return value;
  }

  function currency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  function percentage(value) {
    return (value.toFixed(2) * 100).toString() + "%";
  }
})();