import {chooseRandom} from './util.js';
import {showUsersPictures} from './picture.js';

const NUMBER_OF_RANDOM_PICTURES = 10;

const sortRandomly = function (evt, picturesArray) {
  const arrayIdPhotos = Array.from(Array(picturesArray.length).keys());
  const randomElements = chooseRandom(arrayIdPhotos, NUMBER_OF_RANDOM_PICTURES);
  const pictures = [];

  randomElements.forEach(function (index) {
    pictures.push(picturesArray[index])
  });

  showUsersPictures(pictures);
};

const sortDiscussed = function (evt, picturesArray) {
  const sortedPictures = [...picturesArray].sort(function(currentPicture, nextPicture) {
    if (currentPicture.comments.length < nextPicture.comments.length) {
      return 1;
    }
    if (currentPicture.comments.length > nextPicture.comments.length) {
      return -1;
    }
    return 0;
  });

  showUsersPictures(sortedPictures);
};

export {sortRandomly, sortDiscussed}
