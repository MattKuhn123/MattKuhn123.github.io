function getTestDocument() {
  const iframe = document.querySelector("iframe");
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  return iframeDocument;
}

function changeValue(parent, name, value) {
  const elt = parent.querySelector(`[name=${name}]`);
  elt.value = value;
  elt.dispatchEvent(new Event("change", { bubbles: true }));
}