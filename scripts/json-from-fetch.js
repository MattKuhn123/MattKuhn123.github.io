function jsonFromFetch(url) {
  return new Promise(resolve => {
    fetch(url).then(result => {
      result.json().then(json => {
        resolve(json);
      });
    });
  });
}