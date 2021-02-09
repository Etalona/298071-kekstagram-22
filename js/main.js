'use strict';
function getRandomIntInclusive(min, max) {
  if (min < 0) {
    return 'Диапазон может быть только положительный, включая ноль.';
  } else if (max <= min) {
    return 'Недопустимо передавать «до» меньшее, чем значение «от», или равное ему.'
  } else if (max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
}
getRandomIntInclusive(1, 25);

function checkLengthComment(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}
checkLengthComment('sjefhksjfh', 90);

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const names = [
  'Счастливая Мать',
  'Сергей Стиллавин',
  'Troll Face',
  'Артемий Лебедев',
  'Stephen Lennon',
  'Лена Миро',
];

const getRandomArrayElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

const createDescriptions = () => {
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
        avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.jpg',
        message: getRandomArrayElement(comments),
        name: getRandomArrayElement(names),
      });
    }

    list.push(obj);
  }

  return list;
};
createDescriptions();

