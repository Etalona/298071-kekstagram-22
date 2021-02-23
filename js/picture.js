const showUsersPictures = function (pictures) {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesContainer = document.querySelector('.pictures');

  for (let i = 0; i < pictures.length; i++) {
    let picture = pictureTemplate.cloneNode(true);
    let pictureImg = picture.querySelector('.picture__img');
    let listElement = pictures[i];

    pictureImg.src =  listElement.url;

    let pictureCommentsCount = picture.querySelector('.picture__comments');
    pictureCommentsCount.textContent = listElement.comments.length;

    let pictureLikesCount = picture.querySelector('.picture__likes');
    pictureLikesCount.textContent = listElement.likes;

    picturesContainer.appendChild(picture);
  }
};

export {showUsersPictures}
