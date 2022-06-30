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

export {getRandomeInInclusie, getRandomArrayElement, isEscapeKey};

