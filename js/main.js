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
getRandomIntInclusive(10, 25);
function checkLengthComment(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}
checkLengthComment('sjefhksjfh', 90);
