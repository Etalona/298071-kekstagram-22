const ALERT_SHOW_TIME = 5000;

const showAlert = function (message) {
  const alertContainerElement = document.querySelector('.error__block');
  alertContainerElement.classList.remove('hidden');
  alertContainerElement.textContent = message;

  setTimeout(function ()  {
    alertContainerElement.classList.add('hidden');
  }, ALERT_SHOW_TIME);
};

const successTemplateElement = document.querySelector('#success').content;
const errorTemplateElement = document.querySelector('#error').content;

const showInfoUpload = function (response) {
  const successUpload = successTemplateElement.cloneNode(true);
  const errorUpload = errorTemplateElement.cloneNode(true);
  if (response) {
    document.querySelector('main').appendChild(successUpload);
    closeMessage();
  } else {
    document.querySelector('main').appendChild(errorUpload);
    closeMessage();
  }
};

const closeMessage = function () {
  document.querySelector('main').addEventListener('click', function(evt) {
    let target = evt.target;
    if (target.classList.contains('close__button')) {
      document.querySelector('.modal').remove();
    }

    if (target.classList.contains('modal')) {
      target.remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      document.querySelector('.modal').remove();
    }
  });
};

export { showAlert, showInfoUpload};
