const uploadClickHandler = function (evt) {

  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.querySelector('.img-upload__cancel').addEventListener('click', function() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
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

  /* global noUiSlider:readonly */
  const sliderElement = document.querySelector('.effect-level__slider');
  const valueElement = document.querySelector('.effect-level__value');

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

  sliderElement.noUiSlider.on('update', (values, handle) => {
    valueElement.value = values[handle];
  });



 // sliderElement.noUiSlider.destroy();



};

export {uploadClickHandler, imageScale, imageEffect}

