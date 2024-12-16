function jsonFromForm(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const json = {}
  for (var [key, value] of formData.entries()) {
    json[key] = value;
  }

  return json;
}

function jsonToForm(formId, json) {
  const form = document.getElementById(formId);
  const jsonKeys = Object.keys(json);
  jsonKeys.forEach(key => {
    const elt = form.querySelector("[name="+key+"]");
    if (elt.getAttribute("type") == "checkbox") {
      elt.setAttribute("checked", json[key] === "on");
    } else {
      elt.value = json[key];
    }
  });
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

function jsonToFile(formId) {
  return URL.createObjectURL(new Blob([JSON.stringify(jsonFromForm(formId))], { type: 'text/plain' }));
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