const pictureClickHandler = function (evt, pictures) {
  const pictureElement = evt.target;

  const currPictureIndex = pictureElement.getAttribute('index');
  const currPicture = pictures[currPictureIndex];

  const bigPicture =  document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  const bigPictureContainer = bigPicture.querySelector('.big-picture__img');
  const bigPictureImg = bigPictureContainer.querySelector('img');
  bigPictureImg.src = currPicture.url;

  const socialCaption = bigPicture.querySelector('.social__caption');
  socialCaption.textContent =  currPicture.description;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = currPicture.likes;

  const commentsCount = bigPicture.querySelector('.comments-count');
  commentsCount.textContent = currPicture.comments.length;

  const commentsContainer = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('#comment').content;

  commentsContainer.innerHTML = ('');
  for (let i = 0; i < currPicture.comments.length; i++) {


    let commentNode = commentTemplate.cloneNode(true);
    let commentAvatar = commentNode.querySelector('.social__picture');
    let commentText = commentNode.querySelector('.social__text');

    commentAvatar.src = currPicture.comments[i].avatar;
    commentAvatar.alt = currPicture.comments[i].name;

    commentText.textContent = currPicture.comments[i].message;

    commentsContainer.appendChild(commentNode);
  }

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.querySelector('.big-picture__cancel').addEventListener('click', function() {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

  });
};

export {pictureClickHandler}
