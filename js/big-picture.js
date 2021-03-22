const SHOW_PICTURE_NUM = 5;

const hideCommentsLoader = function () {
  const commentsLoaderElement = document.querySelector('.comments-loader').classList;
  commentsLoaderElement.add('hidden');
};

const showComments = function (comments) {
  const commentsCount = document.querySelectorAll('.social__comments li').length;
  const showCountComments = comments.slice(commentsCount, commentsCount + SHOW_PICTURE_NUM);
  const commentTemplateElement = document.querySelector('#comment').content;
  const commentsContainerElement = document.querySelector('.social__comments');

  if (showCountComments.length < SHOW_PICTURE_NUM) {
    hideCommentsLoader();
  }
  for (let i = 0; i < showCountComments.length; i++) {
    let commentNode = commentTemplateElement.cloneNode(true);
    let commentAvatarElement = commentNode.querySelector('.social__picture');
    let commentTextElement = commentNode.querySelector('.social__text');

    commentAvatarElement.src = showCountComments[i].avatar;
    commentAvatarElement.alt = showCountComments[i].name;
    commentTextElement.textContent = showCountComments[i].message;

    commentsContainerElement.appendChild(commentNode);
  }
};

const pictureClickHandler = function (evt, pictures) {

  const pictureElement = evt.target;

  const currPictureId = pictureElement.dataset.pictureId;
  const currPicture = pictures.find(function (item) {
    return item.id === parseInt(currPictureId);
  });

  const bigPictureElement =  document.querySelector('.big-picture');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.dataset.pictureId = currPictureId;

  const bigPictureContainerElement = bigPictureElement.querySelector('.big-picture__img');
  const bigPictureImgElement = bigPictureContainerElement.querySelector('img');
  bigPictureImgElement.src = currPicture.url;

  const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
  socialCaptionElement.textContent =  currPicture.description;

  const likesCountElement = bigPictureElement.querySelector('.likes-count');
  likesCountElement.textContent = currPicture.likes;

  const commentsCountElement = bigPictureElement.querySelector('.comments-count');
  commentsCountElement.textContent = currPicture.comments.length;

  const commentsContainerElement = document.querySelector('.social__comments');
  commentsContainerElement.innerHTML = '';
  showComments(currPicture.comments);

  if (currPicture.comments.length <= 5) {
    hideCommentsLoader();
  }
  else {
    document.querySelector('.comments-loader').classList.remove('hidden');
  }

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.querySelector('.big-picture__cancel').addEventListener('click', function() {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
};

export {pictureClickHandler, showComments}
