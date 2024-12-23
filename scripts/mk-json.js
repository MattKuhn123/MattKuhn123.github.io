(() => {
  const on = (element, type, selector, handler) => {
    element.addEventListener(type, (event) => {
      if (event.target.closest(selector)) {
        handler(event);
      }
    });
  };

  on(document, 'click', 'button[mk-form-to-json-file]', (event) => {
    const form = event.target.closest("form");
    const a = document.createElement("a");
    a.setAttribute('href', jsonToFile(form));
    a.setAttribute("download", "download.json");
    a.click();
    a.remove();
  });

  on(document, 'click', 'button[mk-json-file-to-form-for]', (event) => {
    const form = event.target.closest("form");
    const targetId = event.target.getAttribute("mk-json-file-to-form-for");
    const target = form.querySelector("#" + targetId);
    target.click();
  });

  on(document, 'change', 'input[mk-json-file-to-form]', (event) => {
    const form = event.target.closest("form");
    jsonFromFile(event).then((json) => jsonToForm(form, json))
  });
  
  on(document, 'change', 'select[mk-json-file-from-fetch]', (event) => {
    const form = event.target.closest("form");
    jsonFromFetch(event.target.value).then((json) => jsonToForm(form, json));
  });

  function jsonToFile(form) {
    return URL.createObjectURL(new Blob([JSON.stringify(jsonFromForm(form))], { type: 'text/plain' }));
  }

  function jsonFromForm(form) {
    const formData = new FormData(form);
    const json = {}
    for (let [key, value] of formData.entries()) {
      json[key] = value;
    }
  
    return json;
  }

  function jsonToForm(form, json) {
    const jsonKeys = Object.keys(json);
    jsonKeys.forEach(key => {
      const elt = form.querySelector("[name="+key+"]");
      if (elt.getAttribute("type") == "checkbox") {
        elt.setAttribute("checked", json[key] === "on");
      } else {
        elt.value = json[key];
      }
    });

    form.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function jsonFromFile(event) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileContent = e.target.result;
        const json = JSON.parse(fileContent);
        resolve(json);
      };

      reader.onerror = function(e) {
        reject(e);
      }

      reader.readAsText(file);
    });
  }

  function jsonFromFetch(url) {
    return new Promise(resolve => {
      fetch(url).then(result => {
        result.json().then(json => {
          resolve(json);
        });
      });
    });
  }
})();