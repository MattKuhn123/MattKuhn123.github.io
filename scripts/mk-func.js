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
    const elt = form.querySelectorAll("output[for]");
    Array.from(elt).forEach(function(elt) {
      const argNames = elt.getAttribute("for");
      const formula = argNames
      .split(" ")
      .map(x => {
        return [ "+", "-", "*", "/", "%", "(", ")", "**" ].find(op => op === x) ? x
          : getElementValue(form.querySelector("[name=" + x + "]"));
      }).join(" ");

      const dataValue = eval(formula);
      elt.setAttribute("data-value", dataValue);
      elt.dispatchEvent(new Event("change", { bubbles: true }));

      const maskFormat = elt.getAttribute("mk-mask");
      const maskFunc = getMaskFormatter(maskFormat);
      const maskedValue = maskFunc(dataValue);
      elt.innerText = maskedValue;
    });
  });

  function getElementValue(x) {
    return x.tagName.toLowerCase() === "input" 
      ? Number(x.value) 
      : Number(x.getAttribute("data-value"));
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