import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const ALLOWED_COMMENT_LENGTH = 140;
const NUMBER_OF_HASHTAGS = 5;
const HASHTAG_LENGTH = 20;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const scaleControlElement = document.querySelector('.scale');
const sliderElement = document.querySelector('.effect-level__slider');
const imgPreviewElement =  document.querySelector('.img-upload__preview img');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const effectsListElement = document.querySelector('.effects__list');
const sliderValueElement = document.querySelector('.effect-level__value');
const textHashtagElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const uploadInputElement = document.querySelector('.img-upload__input');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const overlayElement = document.querySelector('.img-upload__overlay');

let currentScale = parseInt(scaleControlValueElement.value);
let currentEffect = 'none';

const closeUploadForm = function () {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetFormState();
  removeCallbacks();
};

const imageScale = function (direction) {
  if (direction) {
    if (currentScale !== 100) {
      currentScale += 25;
    }
  } else {
    if (currentScale !== 25) {
      currentScale -= 25;
    }
  }
  scaleControlValueElement.value = currentScale + '%';
  let scaleValue = currentScale / 100;
  imgPreviewElement.style.transform = 'scale(' + scaleValue + ')';
};

const applyImageEffect = function (selectedEffect, oldEffect) {
  imgPreviewElement.classList.remove('effects__preview--' + oldEffect);
  imgPreviewElement.classList.add('effects__preview--' + selectedEffect);
};

const changeIntensityEffect = function (effect, valueEffect) {
  const effectLevelElement = document.querySelector('.img-upload__effect-level');
  effectLevelElement.classList.remove('hidden');
  document.querySelector('.effect-level__value').value = valueEffect;

  if (effect === 'chrome') {
    let valueEffectRange =  valueEffect / 100;
    imgPreviewElement.style.filter = 'grayscale(' + valueEffectRange + ')';
  } else if (effect === 'sepia') {
    let valueEffectRange =  valueEffect / 100;
    imgPreviewElement.style.filter = 'sepia(' + valueEffectRange + ')';
  } else if (effect === 'marvin') {
    let valueEffectRange =  valueEffect + '%';
    imgPreviewElement.style.filter = 'invert(' + valueEffectRange + ')';
  } else if (effect === 'phobos') {
    let valueEffectRange =  (valueEffect * 0.03).toFixed(2) + 'px';
    imgPreviewElement.style.filter = 'blur(' + valueEffectRange + ')';
  } else if (effect === 'heat') {
    let valueEffectRange =  ((valueEffect * 0.02) + 1).toFixed(2);
    imgPreviewElement.style.filter = 'brightness(' + valueEffectRange + ')';
  } else {
    effectLevelElement.classList.add('hidden');
    imgPreviewElement.style.filter = 'none';
  }
};

const resetFormState = function () {
  imgPreviewElement.style.transform = 'scale(1)';
  scaleControlValueElement.value = 100 + '%';
  currentScale = 100;

  applyImageEffect('none', currentEffect);
  currentEffect = 'none';

  changeIntensityEffect('none', 0);

  document.querySelector('.effects__radio:first-child').checked = true;

  uploadInputElement.value = '';
  textHashtagElement.value = '';
  textDescriptionElement.value = '';

  textHashtagElement.setCustomValidity('');
  textDescriptionElement.setCustomValidity('');
};

const changeUploadedPicture = function () {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function(it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      imgPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const hashtagsChangeHandler = function (evt) {
  const inputElement = evt.target;

  let hashtagsArray = inputElement.value.split(' ').filter(e => e).map(function (value) {
    return value.toLowerCase();
  });
  const uniqueSet = new Set(hashtagsArray);
  inputElement.setCustomValidity('');

  if (uniqueSet.size < hashtagsArray.length) {
    inputElement.setCustomValidity('Хэштэги не должны повторяться');
  }

  if (hashtagsArray.length > NUMBER_OF_HASHTAGS) {
    inputElement.setCustomValidity('Хэштегов не может быть больше 5 штук');
  }

  for (let i = 0; i < hashtagsArray.length; i++) {
    let hashtag = hashtagsArray[i];

    if ((hashtag.charAt(0)) !== '#') {
      inputElement.setCustomValidity('Хештэг должен начинаться с "#"');
      break;
    }

    if (!/^#[\w\d]+$/.test(hashtag)) {
      inputElement.setCustomValidity('Хэштэг не должен быть пустым и должен содержать только буквы и/или цифры');
      break;
    }

    if (hashtag.length > HASHTAG_LENGTH) {
      inputElement.setCustomValidity('Хэштэг не должен содержать больше 19 символов после "#"');
      break;
    }
  }

  inputElement.reportValidity();
};

const commentsChangeHandler = function (evt) {
  const commentTextareaElement = evt.target;

  commentTextareaElement.setCustomValidity('');

  if (commentTextareaElement.value.length > ALLOWED_COMMENT_LENGTH) {
    commentTextareaElement.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }

  commentTextareaElement.reportValidity();
};

const scaleClickHandler = function (evt) {
  let scaleDirection = evt.target.classList.contains('scale__control--bigger');
  imageScale(scaleDirection);
};

const effectSelectHanlder = function (evt) {
  if (evt.target.nodeName === 'INPUT') {
    let effect = evt.target.value;
    applyImageEffect(effect, currentEffect);
    currentEffect = effect;

    sliderElement.noUiSlider.set(100);
  }
};

const closeButtonClickHandler = function (evt) {
  evt.preventDefault();

  closeUploadForm();
};

const escapeKeyPressedHandler = function (evt) {
  let classList = evt.target.classList;

  if (classList.contains('text__hashtags') || classList.contains('text__description')) {
    return false;
  }

  if (evt.key === ('Escape' || 'Esc')) {
    closeUploadForm();
  }
};

const initSlider = function () {
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
    sliderValueElement.value = values[handle];
    changeIntensityEffect(currentEffect, sliderValueElement.value);
  });
};

const attachCallbacks = function () {
  changeUploadedPicture();
  initSlider();

  scaleControlElement.addEventListener('click', scaleClickHandler);
  effectsListElement.addEventListener('click', effectSelectHanlder);
  textHashtagElement.addEventListener('input', hashtagsChangeHandler);
  textDescriptionElement.addEventListener('input', commentsChangeHandler);
  closeButtonElement.addEventListener('click', closeButtonClickHandler);

  document.addEventListener('keydown', escapeKeyPressedHandler);
};

const removeCallbacks = function () {
  scaleControlElement.removeEventListener('click', scaleClickHandler);
  effectsListElement.removeEventListener('click', effectSelectHanlder);
  textHashtagElement.removeEventListener('input', hashtagsChangeHandler);
  textDescriptionElement.removeEventListener('input', commentsChangeHandler);
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);

  document.removeEventListener('keydown', escapeKeyPressedHandler);

  sliderElement.noUiSlider.off();
  sliderElement.noUiSlider.destroy();
};

export { closeUploadForm, attachCallbacks }

