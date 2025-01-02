(() => {
  const on = (element, type, selector, handler) => {
    element.addEventListener(type, (event) => {
      if (event.target.closest(selector))
        handler(event);
    });
  };

  on(document, 'change', 'output', (event) => {
    const fnPieces = event.target.getAttribute("mk-formula").split(" ");
    const fnString = "return " + fnPieces.map(x => !isOp(x) && !isNum(x) ? `fnParams["${x}"]` : x).join(" ");
    const fnParams = { };
    for (const x of fnPieces.filter(x => !isOp(x) && !isNum(x)))
      fnParams[x] = getValue(x);
  
    // Set value
    const value = new Function('fnParams', fnString)(fnParams);
    event.target.setAttribute("data-value", value);
  
    // Set mask
    const maskFormat = event.target.getAttribute("mk-mask");
    const maskedValue = getMaskFormatFn(maskFormat)(value);
    event.target.innerText = maskedValue;

    propagateCalculation(event.target.getAttribute("name"));
  });

  on(document, 'change', 'input', (event) =>
    propagateCalculation(event.target.getAttribute("name"))
  );
  
  function propagateCalculation(name) {
    Array.from(document.querySelectorAll(`output[mk-formula*=${name}]`)).forEach((output) =>
      output.dispatchEvent(new Event("change", { bubbles: true }))
    );
  }

  function getValue(name) {
    const x = document.querySelector("[name=" + name + "]");
    const value =  x.getAttribute("data-value") ?? x.value;
    
    const result = Number(value);
    if (isNaN(result))
      throw new Error(`${name}'s value, ${value}, is not a number`);

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