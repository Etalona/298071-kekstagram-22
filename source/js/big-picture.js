import {closeModalCallback} from './util.js';

const SHOW_PICTURE_NUM = 5;

const toggleCommentsLoader = function (allComments, existCommentsCount) {
  const loaderElement = document.querySelector('.comments-loader').classList;

  existCommentsCount >= allComments.length ? loaderElement.add('hidden') : loaderElement.remove('hidden');
};

const showComments = function (comments) {
  const commentsCount = document.querySelectorAll('.social__comments li').length;
  const showCountComments = comments.slice(commentsCount, commentsCount + SHOW_PICTURE_NUM);
  const commentTemplateElement = document.querySelector('#comment').content;
  const commentsContainerElement = document.querySelector('.social__comments');

  showCountComments.forEach(function (comment) {
    let commentNode = commentTemplateElement.cloneNode(true);
    let commentAvatarElement = commentNode.querySelector('.social__picture');
    let commentTextElement = commentNode.querySelector('.social__text');

    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    commentTextElement.textContent = comment.message;

    commentsContainerElement.appendChild(commentNode);
  });

  toggleCommentsLoader(comments, commentsCount + SHOW_PICTURE_NUM);
};

const pictureClickHandler = function (evt, pictures) {

  const pictureElement = evt.target;

  const currentPictureId = pictureElement.dataset.pictureId;
  const currentPicture = pictures.find(function (item) {
    return item.id === parseInt(currentPictureId);
  });

  const bigPictureElement =  document.querySelector('.big-picture');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.dataset.pictureId = currentPictureId;

  const bigPictureContainerElement = bigPictureElement.querySelector('.big-picture__img');
  const bigPictureImgElement = bigPictureContainerElement.querySelector('img');
  bigPictureImgElement.src = currentPicture.url;

  const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  socialCaptionElement.textContent =  currentPicture.description;

  const likesCountElement = bigPictureElement.querySelector('.likes-count');
  likesCountElement.textContent = currentPicture.likes;

  const commentsCountElement = bigPictureElement.querySelector('.comments-count');
  commentsCountElement.textContent = currentPicture.comments.length;

  const commentsContainerElement = document.querySelector('.social__comments');
  commentsContainerElement.innerHTML = '';
  showComments(currentPicture.comments);
  toggleCommentsLoader(currentPicture.comments, SHOW_PICTURE_NUM);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.querySelector('.big-picture__cancel').addEventListener('click', function() {
    closeModalCallback(bigPictureElement);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      closeModalCallback(bigPictureElement);
    }
  });
};

export {pictureClickHandler, showComments}
