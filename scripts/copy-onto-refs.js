function copyOntoRefs(refs, data) {
  Object.keys(data).forEach(key => {
    if (!!refs[key]) {
      refs[key]._x_model.set(data[key]);
    }
  });
}

function copyOntoRef(refs, key, value) {
  refs[key]._x_model.set(value);
}