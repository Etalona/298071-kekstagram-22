const getData = function (onSuccess) {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
      return pictures;
    });
};

const sendData = function (formData) {
  return fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
};

export {getData, sendData}
