import {showUsersPictures} from './picture.js';
import {pictureClickHandler } from './big-picture.js';
import { getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {closeUploadForm} from './image-edit.js';
import {sortRandomly, sortDiscussed} from './image-filter.js';
import { debounce } from 'lodash';
import {attachCallbacks} from './image-edit.js';
import {showInfoModal} from './modal-info.js';

const RERENDER_DELAY = 500;

let currentFilter = 'filter-default';
let picturesList = [];

getData(showUsersPictures).then(function(pictures) {
  picturesList = pictures;

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
    .then(function () {
      closeUploadForm();
      showInfoModal();
    })
    .catch(function () {
      closeUploadForm();
      showInfoModal(true);
    });

});

document.querySelector('.img-upload__input').addEventListener('change', function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  attachCallbacks();
});

const filterClickHandler = debounce(function (evt) {
  let oldButton = currentFilter;
  currentFilter = evt.target.id;

  document.querySelector('#' + oldButton).classList.remove('img-filters__button--active');

  if (currentFilter === 'filter-default') {
    showUsersPictures(picturesList);
  }
  if (currentFilter === 'filter-random') {
    sortRandomly(evt.target, picturesList);
  }
  if (currentFilter === 'filter-discussed') {
    sortDiscussed(evt.target, picturesList);
  }

  document.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
}, RERENDER_DELAY);

document.querySelector('.img-filters__form').addEventListener('click', filterClickHandler);
