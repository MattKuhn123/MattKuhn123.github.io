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
    const outputs = form.querySelectorAll("output[for]");
    Array.from(outputs).forEach((output) => {
      const formulaPieces = output.getAttribute("for").split(" ");
      const formulaString = "return " + formulaPieces.map(x => !isOperator(x) && !isNumber(x) ? `args["${x}"]` : x).join(" ");
      const args = { };
      for (const x of formulaPieces.filter(x => !isOperator(x) && !isNumber(x))) {
        args[x] = getElementValue(x);
      }

      const value = new Function('args', formulaString)(args);
      output.setAttribute("data-value", value);
      output.dispatchEvent(new Event("change", { bubbles: true }));

      const maskFormat = output.getAttribute("mk-mask");
      const maskFunc = getMaskFormatter(maskFormat);
      const maskedValue = maskFunc(value);
      output.innerText = maskedValue;
    });
  });

  function isOperator(x) {
    const result = [ "+", "-", "*", "/", "%", "(", ")", "**", "++", "--" ].find(op => op === x);
    return result !== undefined;
  }

  function isNumber(x) {
    const result = /^[0-9]*$/g.test(x);
    return result;
  }

  function getElementValue(name) {
    const x = form.querySelector("[name=" + name + "]");
    const result =  x.tagName.toLowerCase() === "input" 
      ? Number(x.value) 
      : Number(x.getAttribute("data-value"));
    return result;
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