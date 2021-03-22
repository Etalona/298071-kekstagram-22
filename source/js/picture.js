const showUsersPictures = function (pictures) {
  const pictureTemplateElement = document.querySelector('#picture').content;
  const picturesContainerElement = document.querySelector('.pictures');
  const pictureCollection = document.querySelectorAll('.picture');
  pictureCollection.forEach(function (element) {
    element.remove();
  });

  for (let i = 0; i < pictures.length; i++) {
    let pictureTemplate = pictureTemplateElement.cloneNode(true);
    let pictureImgElement = pictureTemplate.querySelector('.picture__img');
    let picture = pictures[i];

    pictureImgElement.src =  picture.url;
    pictureImgElement.dataset.pictureId = picture.id;

    let pictureCommentsCountElement = pictureTemplate.querySelector('.picture__comments');
    pictureCommentsCountElement.textContent = picture.comments.length;

    let pictureLikesCountElement = pictureTemplate.querySelector('.picture__likes');
    pictureLikesCountElement.textContent = picture.likes;

    picturesContainerElement.appendChild(pictureTemplate);
  }
};

export {showUsersPictures}

