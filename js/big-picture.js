const pictureClickHandler = function (evt, pictures) {
  const pictureElement = evt.target;

  const currPictureIndex = pictureElement.getAttribute('index');
  const currPicture = pictures[currPictureIndex];

  const bigPictureElement =  document.querySelector('.big-picture');
  bigPictureElement.classList.remove('hidden');

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
  const commentTemplateElement = document.querySelector('#comment').content;

  commentsContainerElement.innerHTML = ('');
  for (let i = 0; i < currPicture.comments.length; i++) {


    let commentNode = commentTemplateElement.cloneNode(true);
    let commentAvatarElement = commentNode.querySelector('.social__picture');
    let commentTextElement = commentNode.querySelector('.social__text');

    commentAvatarElement.src = currPicture.comments[i].avatar;
    commentAvatarElement.alt = currPicture.comments[i].name;

    commentTextElement.textContent = currPicture.comments[i].message;

    commentsContainerElement.appendChild(commentNode);
  }

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.querySelector('.big-picture__cancel').addEventListener('click', function() {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
};

export {pictureClickHandler}
