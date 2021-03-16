import {showUsersPictures} from './picture.js';
import {pictureClickHandler} from './big-picture.js';
import {uploadClickHandler, imageScale, applyImageEffect, changeIntensityEffect, validateHashtags, validateComment} from './image-edit.js';
import '../nouislider/nouislider.js';
import { getData, sendData} from './api.js';
import {showAlert, showInfoUpload} from './util.js';
import {resetImgUpload, closeForm} from './image-edit.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
let currentEffect = 'none';

getData(showUsersPictures).then(function(pictures) {
  document.querySelector('.pictures').addEventListener('click', function(evt) {
    if (evt.target.className === 'picture__img') {
      pictureClickHandler(evt, pictures);
    }
  });
}).catch( function () {
  showAlert('Не удалось загрузить фото. Перезагрузите страницу');
});

document.querySelector('.img-upload__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(formData)
    .then((response) => {
      closeForm();
      resetImgUpload(currentEffect);
      showInfoUpload(response);
    })
    .catch(() => {
      closeForm();
      showInfoUpload(false);
    });

});

document.querySelector('.img-upload__control').addEventListener('click', function(evt) {
  uploadClickHandler(evt);
});

document.querySelector('.scale').addEventListener('click', function(evt) {
  let scaleDirection = evt.target.classList.contains('scale__control--bigger');
  imageScale(scaleDirection);
});

document.querySelector('.effects__list').addEventListener('click', function(evt) {
  if (evt.target.nodeName === 'INPUT') {
    let effect = evt.target.value;
    applyImageEffect(effect, currentEffect);
    currentEffect = effect;

    sliderElement.noUiSlider.set(100);
  }
});

valueElement.value = 100;

/* global noUiSlider:readonly */
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', function (values, handle) {
  valueElement.value = values[handle];
  changeIntensityEffect(currentEffect, valueElement.value);
});

document.querySelector('.text__hashtags').addEventListener('input', function(evt) {
  validateHashtags(evt.target);
});
document.querySelector('.text__description').addEventListener('input', function(evt) {
  validateComment(evt.target);
});
