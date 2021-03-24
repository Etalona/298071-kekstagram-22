const ALERT_SHOW_TIME = 6000;

const showAlert = function (message) {
  const alertContainerElement = document.querySelector('.error__block');
  alertContainerElement.classList.remove('hidden');
  alertContainerElement.textContent = message;

  setTimeout(function ()  {
    alertContainerElement.classList.add('hidden');
  }, ALERT_SHOW_TIME);
};

const chooseRandom = function(numbersArray, num = 1)  {
  const results = [];
  for(let i = 0; i < num; ){
    const random = Math.floor(Math.random() * numbersArray.length);
    if(results.indexOf(numbersArray[random]) !== -1){
      continue;
    }
    results.push(numbersArray[random]);
    i++;
  }
  return results;
};

export { showAlert, chooseRandom};
