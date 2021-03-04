import {comments, names} from './data.js';
import {createDescriptions, checkLengthComment} from './util.js';
import {showUsersPictures} from './picture.js';
import {pictureClickHandler} from './big-picture.js';
import {uploadClickHandler, imageScale, imageEffect} from './image-edit.js';

const pictures = createDescriptions(comments, names);
showUsersPictures(pictures);
checkLengthComment('sjefhksjfh', 90);

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
  let selectedEffect;
  if (evt.target.nodeName === 'INPUT') {
    selectedEffect = evt.target.value;
  }
  imageEffect(selectedEffect);
});
