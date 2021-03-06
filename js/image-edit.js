const uploadClickHandler = function () {

  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  function closeForm() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__input').value = '';
  }

  document.querySelector('.img-upload__cancel').addEventListener('click', function() {
    closeForm();
  });
  document.addEventListener('keydown', (evt) => {
    let classList = evt.target.classList;
    if (classList.contains('text__hashtags') || classList.contains('text__description')) {
      return false;
    }

    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      closeForm();
    }
  });


};

const imageScale = function (direction) {

  let scaleControlValue = document.querySelector('.scale__control--value');
  let currentScale = parseInt(scaleControlValue.value);

  const imgUpload =  document.querySelector('.img-upload__preview img');

  if (direction) {
    if (currentScale !== 100) {
      currentScale += 25;
    }
  } else {
    if (currentScale !== 25) {
      currentScale -= 25;
    }
  }
  scaleControlValue.value = currentScale + '%';
  let scaleValue = currentScale / 100;

  imgUpload.style.transform = 'scale(' + scaleValue + ')';
};

const imageEffect = function (selectedEffect) {
  const imgUpload =  document.querySelector('.img-upload__preview img');
  imgUpload.className = 'effects__preview--none';
  imgUpload.classList.add('effects__preview--' + selectedEffect);
};

const changeIntensityEffect = function (effect, valueEffect) {
  const imgUpload =  document.querySelector('.img-upload__preview img');
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
  document.querySelector('.effect-level__value').value = valueEffect;
  if (effect === 'chrome') {
    let valueEffectRange =  valueEffect / 100;
    imgUpload.style.filter = 'grayscale(' + valueEffectRange + ')';
  } else if (effect === 'sepia') {
    let valueEffectRange =  valueEffect / 100;
    imgUpload.style.filter = 'sepia(' + valueEffectRange + ')';
  } else if (effect === 'marvin') {
    let valueEffectRange =  valueEffect + '%';
    imgUpload.style.filter = 'invert(' + valueEffectRange + ')';
  } else if (effect === 'phobos') {
    let valueEffectRange =  (valueEffect * 0.03).toFixed(2) + 'px';
    imgUpload.style.filter = 'blur(' + valueEffectRange + ')';
  } else if (effect === 'heat') {
    let valueEffectRange =  ((valueEffect * 0.02) + 1).toFixed(2);
    imgUpload.style.filter = 'brightness(' + valueEffectRange + ')';
  } else {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    imgUpload.style.filter = 'none';
  }
};

const validHashtags = function (hashtagsArray) {
  const inputHashtag = document.querySelector('.text__hashtags');
  const uniqueSet = new Set(hashtagsArray);
  inputHashtag.setCustomValidity('');

  if (uniqueSet.size < hashtagsArray.length) {
    inputHashtag.setCustomValidity('Хэштэги не должны повторяться');
  }

  if (hashtagsArray.length > 5) {
    inputHashtag.setCustomValidity('Хэштегов не может быть больше 5 штук');
  }

  for (let i = 0; i < hashtagsArray.length; i++) {
    let hashtag = hashtagsArray[i];

    if ((hashtag.charAt(0)) !== '#') {
      inputHashtag.setCustomValidity('Хештэг должен начинаться с "#"');
      break;
    }

    if (!/^#[\w\d]+$/.test(hashtag)) {
      inputHashtag.setCustomValidity('Хэштэг не должен быть пустым и должен содержать только буквы и/или цифры');
      break;
    }

    if (hashtag.length > 20) {
      inputHashtag.setCustomValidity('Хэштэг не должен содержать больше 19 символов после "#"');
      break;
    }
  }

  inputHashtag.reportValidity();
};

const validComment = function (comment) {
  const commentTextarea = document.querySelector('.text__description');
  commentTextarea.setCustomValidity('');
  if (comment.length > 140) {
    commentTextarea.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }

  commentTextarea.reportValidity();
}

export {uploadClickHandler, imageScale, imageEffect, changeIntensityEffect, validHashtags, validComment}

