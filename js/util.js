const getRandomIntInclusive = function (min, max) {
  if (min < 0) {
    return 'Диапазон может быть только положительный, включая ноль.';
  } else if (max <= min) {
    return 'Недопустимо передавать «до» меньшее, чем значение «от», или равное ему.'
  } else if (max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
};

const checkLengthComment = function (checkedString, maxLength) {
  return checkedString.length <= maxLength;
};

const getRandomArrayElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

const createDescriptions = (comments, names) => {
  let list = [];
  let obj = {};
  for (let i = 1; i < 26; i++) {
    obj = {
      id: i,
      url: 'photos/' + i + '.jpg',
      description: 'Оцените мой шедевр, друзья!',
      likes: getRandomIntInclusive(15, 200),
      comments: [],
    };
    for (let j = 1; j < 6; j++) {
      obj.comments.push({
        id: j,
        avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.svg',
        message: getRandomArrayElement(comments),
        name: getRandomArrayElement(names),
      });
    }
    list.push(obj);
  }
  return list;
};

export {createDescriptions, checkLengthComment};
