const showUsersPictures = function (pictures) {
  const pictureTemplateElement = document.querySelector('#picture').content;
  const picturesContainerElement = document.querySelector('.pictures');

  for (let i = 0; i < pictures.length; i++) {
    let picture = pictureTemplateElement.cloneNode(true);
    let pictureImgElement = picture.querySelector('.picture__img');
    let listElement = pictures[i];

    pictureImgElement.src =  listElement.url;
    pictureImgElement.setAttribute('index', i + '');

    let pictureCommentsCountElement = picture.querySelector('.picture__comments');
    pictureCommentsCountElement.textContent = listElement.comments.length;

    let pictureLikesCountElement = picture.querySelector('.picture__likes');
    pictureLikesCountElement.textContent = listElement.likes;

    picturesContainerElement.appendChild(picture);
  }
};

export {showUsersPictures}

