const SHOW_PICTURE_NUM = 5;

const bigPictureElement =  document.querySelector('.big-picture');
const closeBtnElement = document.querySelector('.big-picture__cancel');
const commentsLoaderButton = document.querySelector('.comments-loader');

let allPictures = [];

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

const closeModal = function (element) {
  element.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  removeCallbacks();
};

const pictureClickHandler = function (evt, pictures) {
  allPictures = pictures;
  attachCallbacks();

  const pictureElement = evt.target;

  const currentPictureId = pictureElement.dataset.pictureId;
  const currentPicture = pictures.find(function (item) {
    return item.id === parseInt(currentPictureId);
  });

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
};

const escapeBtnPressHandler = function (evt) {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    closeModal(bigPictureElement);
  }
};

const closebtnClickHandler = function (evt) {
  evt.preventDefault();

  closeModal(bigPictureElement);
};

const commentsBtnClickHandler = function (evt) {
  evt.preventDefault();

  const currPictureId = bigPictureElement.dataset.pictureId;
  const currPicture = allPictures.find(function (item) {
    return item.id === parseInt(currPictureId);
  });

  showComments(currPicture.comments);
};

const attachCallbacks = function () {
  closeBtnElement.addEventListener('click', closebtnClickHandler);
  commentsLoaderButton.addEventListener('click', commentsBtnClickHandler);

  document.addEventListener('keydown', escapeBtnPressHandler);
};

const removeCallbacks = function () {
  closeBtnElement.removeEventListener('click', closebtnClickHandler);
  commentsLoaderButton.removeEventListener('click', commentsBtnClickHandler);

  document.removeEventListener('keydown', escapeBtnPressHandler);
};

export {pictureClickHandler }
