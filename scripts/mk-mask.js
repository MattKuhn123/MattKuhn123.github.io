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
    const maskers = form.querySelectorAll("[mk-masks]");
    Array.from(maskers).forEach(function(masker) {
      const maskedId = masker.getAttribute("mk-masks");
      const maskFormat = masker.getAttribute("mk-mask-format");
      const masked = form.querySelector("#" + maskedId);
      const maskFormatter = getMaskFormatter(maskFormat);
      const maskedValue = maskFormatter(masked.value);
      masker.innerText = maskedValue;
    });
  });

  function getMaskFormatter(mask) {
    switch(mask) {
      case "currency": return currency;
      case "percentage": return percentage;
      default: throw new Error("invalid mask: " + mask);
    }
  }

  function currency(value) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(value);
  }

  function percentage(value) {
    return (value * 100).toString() + "%";
  }
})();