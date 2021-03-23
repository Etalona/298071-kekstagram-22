import noUiSlider from 'nouislider';
import {showUsersPictures} from './picture.js';
import {pictureClickHandler, showComments} from './big-picture.js';
import {uploadClickHandler, imageScale, applyImageEffect, changeIntensityEffect, validateHashtags, validateComment, showUploadedPicture} from './image-edit.js';
import { getData, sendData} from './api.js';
import {showAlert, showInfoUpload} from './util.js';
import {resetImgUpload, closeForm} from './image-edit.js';
import {sortRandomly, sortDiscussed} from './image-filter.js';
import { debounce } from 'lodash';
import 'nouislider/distribute/nouislider.css';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
let currentEffect = 'none';
let currentButton = 'filter-default';
let pictureArr = [];

const RERENDER_DELAY = 500;

getData(showUsersPictures).then(function(pictures) {
  pictureArr = pictures;

  document.querySelector('.pictures').addEventListener('click', function(evt) {
    if (evt.target.className === 'picture__img') {
      pictureClickHandler(evt, pictures);
    }
  });
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}).catch( function () {
  showAlert('Не удалось загрузить фото. Перезагрузите страницу');
});

document.querySelector('.img-upload__form').addEventListener('submit', function(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(formData)
    .then(function (response) {
      closeForm();
      resetImgUpload(currentEffect);
      showInfoUpload(response);
    })
    .catch(function () {
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

const debounceCb = debounce(function (evt) {
  let oldButton = currentButton;
  currentButton = evt.target.id;

  document.querySelector('#' + oldButton).classList.remove('img-filters__button--active');

  if (currentButton === 'filter-default') {
    showUsersPictures(pictureArr);
  }
  if (currentButton === 'filter-random') {
    sortRandomly(evt.target, pictureArr);
  }
  if (currentButton === 'filter-discussed') {
    sortDiscussed(evt.target, pictureArr);
  }

  document.querySelector('#' + currentButton).classList.add('img-filters__button--active');
}, RERENDER_DELAY);

document.querySelector('.img-filters__form').addEventListener('click', debounceCb);

document.querySelector('.comments-loader').addEventListener('click', function() {
  const currPictureId = document.querySelector('.big-picture').dataset.pictureId;
  const currPicture = pictureArr.find(function (item) {
    return item.id === parseInt(currPictureId);
  });

  showComments(currPicture.comments);
});

document.querySelector('.img-upload__start input[type=file]').addEventListener('change', function(evt) {
  showUploadedPicture(evt);
});
