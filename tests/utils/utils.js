function getTestDocument() {
  const iframe = document.querySelector("iframe");
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  return iframeDocument;
}

function setAndDispatch(parent, name, attribute, value, event) {
  const elt = parent.querySelector(`[name=${name}]`);
  elt.setAttribute(attribute, value);
  elt.dispatchEvent(new Event(event, { bubbles: true }));
}