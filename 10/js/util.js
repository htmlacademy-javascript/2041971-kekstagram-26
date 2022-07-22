const ALERT_SHOW_TIME = 5000;

const getRandomeInInclusie = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return new Error ('Аргументы не соответствуют задаче');
};

const checkMaxStrLength = (str, maxLenght) => typeof str !== 'string' ? new Error ('Не корректный ввод') : str.length <= maxLenght;
checkMaxStrLength('larisa', 10);

const getRandomArrayElement = (elements) => elements[getRandomeInInclusie(0, elements.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomeInInclusie, getRandomArrayElement, isEscapeKey, showAlert, debounce};

