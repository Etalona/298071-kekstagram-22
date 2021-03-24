const successTemplateElement = document.querySelector('#success').content;
const errorTemplateElement = document.querySelector('#error').content;
const mainSectionElement = document.querySelector('main');

const showInfoModal = function (error) {
  const successUploadElement = successTemplateElement.cloneNode(true);
  const errorUploadElement = errorTemplateElement.cloneNode(true);

  const modalInfoElement = error ? errorUploadElement : successUploadElement;
  mainSectionElement.appendChild(modalInfoElement);

  attachCallbacks();
};

const closeInfoModal = function (modalElement) {
  removeCallbacks(modalElement);
  document.querySelector('.modal').remove();
};

const closeModalClickHandler = function (evt) {
  evt.preventDefault();

  closeInfoModal();
};

const escapeKeyPressHandler = function (evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    closeInfoModal();
  }
};

const attachCallbacks = function () {
  const modalElement = document.querySelector('.modal');
  const closeButtonElement = modalElement.querySelector('.close__button');

  closeButtonElement.addEventListener('click', closeModalClickHandler);
  modalElement.addEventListener('click', closeModalClickHandler);
  document.addEventListener('keydown', escapeKeyPressHandler);
};

const removeCallbacks = function () {
  document.removeEventListener('keydown', escapeKeyPressHandler);
};

export { showInfoModal }
