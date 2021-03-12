const getData = function (onSuccess) {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
      return pictures;
    });
};

const sendData = (onSuccess, showAlert, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData}
