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