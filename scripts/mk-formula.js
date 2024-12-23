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
    const outputs = form.querySelectorAll("output[mk-formula]");
    Array.from(outputs).forEach((output) => {
      const fnPieces = output.getAttribute("mk-formula").split(" ");
      const fnString = "return " + fnPieces.map(x => !isOp(x) && !isNum(x) ? `fnParams["${x}"]` : x).join(" ");
      const fnParams = { };
      for (const x of fnPieces.filter(x => !isOp(x) && !isNum(x))) {
        fnParams[x] = getValue(form, x);
      }

      // Set value
      const value = new Function('fnParams', fnString)(fnParams);
      output.setAttribute("data-value", value);
      output.dispatchEvent(new Event("change", { bubbles: true }));

      // Set mask
      const maskFormat = output.getAttribute("mk-mask");
      const maskedValue = getMaskFormatFn(maskFormat)(value);
      output.innerText = maskedValue;
    });
  });

  function getValue(form, name) {
    const x = form.querySelector("[name=" + name + "]");
    const value =  x.tagName.toLowerCase() === "input" 
      ? x.value 
      : x.getAttribute("data-value");
    
    const result = Number(value);
    if (isNaN(result)) {
      throw new Error(`${name}'s value, ${value}, is not a number`);
    }

    return result;
  }

  function isOp(x) {
    return !![ "+", "-", "*", "/", "%", "(", ")", "**", "++", "--" ].find(op => op === x);
  }

  function isNum(x) {
    return /^[0-9]*$/g.test(x);
  }

  function getMaskFormatFn(mask) {
    switch(mask) {
      case "currency": 
        return (x) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(x);
      case "percentage": 
        return (x) => (x.toFixed(2) * 100).toString() + "%";
      default: 
        return (x) => x;
    }
  }
})();