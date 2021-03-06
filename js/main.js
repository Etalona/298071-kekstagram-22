import {comments, names} from './data.js';
import {createDescriptions, checkLengthComment} from './util.js';
import {showUsersPictures} from './picture.js';
import {pictureClickHandler} from './big-picture.js';
import {uploadClickHandler, imageScale, imageEffect, changeIntensityEffect, validHashtags, validComment} from './image-edit.js';
import '../nouislider/nouislider.js';

const pictures = createDescriptions(comments, names);
let effect = null;

showUsersPictures(pictures);
checkLengthComment('sjefhksjfh', 90);

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

document.querySelector('.pictures').addEventListener('click', function(evt) {
  if (evt.target.className === 'picture__img') {
    pictureClickHandler(evt, pictures);
  }
  return true;
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
    effect = evt.target.value;
    imageEffect(effect);
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

sliderElement.noUiSlider.on('update', (values, handle) => {
  valueElement.value = values[handle];
  changeIntensityEffect(effect, valueElement.value);
});

document.querySelector('.text__hashtags').addEventListener('input', function(evt) {
  let hashtagsArray = (evt.target.value).split(' ').filter(e => e).map(function (value) {
    return value.toLowerCase();
  });

  validHashtags(hashtagsArray);
});
document.querySelector('.text__description').addEventListener('input', function(evt) {

  validComment(evt.target.value);
});
