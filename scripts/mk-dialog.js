(() => {
  const on = (element, type, selector, handler) => {
    element.addEventListener(type, (event) => {
      if (event.target.closest(selector)) {
        handler(event);
      }
    });
  };

  on(document, 'click', '[mk-opens-dialog]', (event) => {
    const targetId = event.target.getAttribute("mk-opens-dialog");
    const modal = document.querySelector("dialog#"+targetId);
    modal.showModal();
  });

  on(document, 'click', '[mk-closes-dialog]', (event) => {
    const targetId = event.target.getAttribute("mk-closes-dialog");
    const modal = document.querySelector("dialog#"+targetId);
    modal.close();
  });

})();