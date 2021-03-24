import {closeModalCallback} from './util.js';

const ALLOWED_COMMENT_LENGTH = 140;
const NUMBER_OF_HASHTAGS = 5;
const HASHTAG_LENGTH = 20;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgUploadElement =  document.querySelector('.img-upload__preview img');
let scaleControlValueElement = document.querySelector('.scale__control--value');
let currentScale = parseInt(scaleControlValueElement.value);

const uploadClickHandler = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeForm = function () {
  closeModalCallback(document.querySelector('.img-upload__overlay'));
  document.querySelector('.img-upload__input').value = '';
  resetImgUpload('none');
};

document.querySelector('.img-upload__cancel').addEventListener('click', function() {
  closeForm();
});

document.addEventListener('keydown', function (evt) {
  let classList = evt.target.classList;
  if (classList.contains('text__hashtags') || classList.contains('text__description')) {
    return false;
  }
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    closeForm();
  }
});

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
  imgUploadElement.style.transform = 'scale(' + scaleValue + ')';
};

const applyImageEffect = function (selectedEffect, oldEffect) {
  imgUploadElement.classList.remove('effects__preview--' + oldEffect);
  imgUploadElement.classList.add('effects__preview--' + selectedEffect);
};

const changeIntensityEffect = function (effect, valueEffect) {
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
  document.querySelector('.effect-level__value').value = valueEffect;
  if (effect === 'chrome') {
    let valueEffectRange =  valueEffect / 100;
    imgUploadElement.style.filter = 'grayscale(' + valueEffectRange + ')';
  } else if (effect === 'sepia') {
    let valueEffectRange =  valueEffect / 100;
    imgUploadElement.style.filter = 'sepia(' + valueEffectRange + ')';
  } else if (effect === 'marvin') {
    let valueEffectRange =  valueEffect + '%';
    imgUploadElement.style.filter = 'invert(' + valueEffectRange + ')';
  } else if (effect === 'phobos') {
    let valueEffectRange =  (valueEffect * 0.03).toFixed(2) + 'px';
    imgUploadElement.style.filter = 'blur(' + valueEffectRange + ')';
  } else if (effect === 'heat') {
    let valueEffectRange =  ((valueEffect * 0.02) + 1).toFixed(2);
    imgUploadElement.style.filter = 'brightness(' + valueEffectRange + ')';
  } else {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    imgUploadElement.style.filter = 'none';
  }
};

const validateHashtags = function (el) {
  let hashtagsArray = el.value.split(' ').filter(e => e).map(function (value) {
    return value.toLowerCase();
  });
  const uniqueSet = new Set(hashtagsArray);
  el.setCustomValidity('');

  if (uniqueSet.size < hashtagsArray.length) {
    el.setCustomValidity('Хэштэги не должны повторяться');
  }

  if (hashtagsArray.length > NUMBER_OF_HASHTAGS) {
    el.setCustomValidity('Хэштегов не может быть больше 5 штук');
  }

  for (let i = 0; i < hashtagsArray.length; i++) {
    let hashtag = hashtagsArray[i];

    if ((hashtag.charAt(0)) !== '#') {
      el.setCustomValidity('Хештэг должен начинаться с "#"');
      break;
    }

    if (!/^#[\w\d]+$/.test(hashtag)) {
      el.setCustomValidity('Хэштэг не должен быть пустым и должен содержать только буквы и/или цифры');
      break;
    }

    if (hashtag.length > HASHTAG_LENGTH) {
      el.setCustomValidity('Хэштэг не должен содержать больше 19 символов после "#"');
      break;
    }
  }
  el.reportValidity();
};

const validateComment = function (commentTextareaElement) {
  commentTextareaElement.setCustomValidity('');
  if (commentTextareaElement.value.length > ALLOWED_COMMENT_LENGTH) {
    commentTextareaElement.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }
  commentTextareaElement.reportValidity();
};

const resetImgUpload = function (currentEffect) {
  imgUploadElement.style.transform = 'scale(1)';
  scaleControlValueElement.value = 100 + '%';
  currentScale = 100;
  applyImageEffect('none', currentEffect);
  changeIntensityEffect('none', 0);
  document.querySelector('.effects__radio:first-child').checked = true;
  const textHashtagElement = document.querySelector('.text__hashtags');
  const textDescriptionElement = document.querySelector('.text__description');
  textHashtagElement.value = '';
  textDescriptionElement.value = '';

  textHashtagElement.setCustomValidity('');
  textDescriptionElement.setCustomValidity('');
};
const showUploadedPicture = function (evt) {
  const previewElement = document.querySelector('.img-upload__preview img');

  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function(it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      previewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
}

export {resetImgUpload, uploadClickHandler, imageScale, applyImageEffect, changeIntensityEffect, validateHashtags, validateComment, closeForm, showUploadedPicture}

