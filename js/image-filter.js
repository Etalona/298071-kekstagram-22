import {chooseRandom} from './util.js';
import {showUsersPictures} from './picture.js';

const NUMBER_OF_RANDOM_PICTURES = 10;

const sortRandomly = function (evt, pictureArr) {
  const arrIdPhotos = Array.from(Array(pictureArr.length).keys());
  const randomElements = chooseRandom(arrIdPhotos, NUMBER_OF_RANDOM_PICTURES);
  const pictures = [];

  randomElements.forEach(function (index) {
    pictures.push(pictureArr[index])
  });

  showUsersPictures(pictures);
};

const sortDiscussed = function (evt, pictureArr) {
  const sortedPictures = [...pictureArr].sort(function(a, b) {
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    return 0;
  });

  showUsersPictures(sortedPictures);
};

export {sortRandomly, sortDiscussed}
