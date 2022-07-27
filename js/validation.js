import { sendData } from './api.js';
import { showMessageSuccess, showMessageError } from './messeges.js';
import { resetFilters } from './effects.js';
import { resetScale } from './scale.js';

const MAX_COUNT_HASHTEGS = 5;
const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new window.Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHeshtags = (value) => {
  const hashtegsElements = getArrayHashtags(value);
  const regex = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| hashtegsElements.every((hashteg)=>regex.test(hashteg));
};

const validateCountHashtags = (value) =>{
  const hashtegsElements = getArrayHashtags(value);
  return hashtegsElements.length <= MAX_COUNT_HASHTEGS;
};

const validateHeshtagsUnique = (value) =>{
  const hashtegsElements = getArrayHashtags(value);
  const set = new Set(hashtegsElements);
  return (set.size === hashtegsElements.length);
};

pristine.addValidator(textHashtags, validateHeshtags, 'Неверный формат хэш-тега');
pristine.addValidator(textHashtags, validateCountHashtags, `Максимум ${MAX_COUNT_HASHTEGS} хэш-тегов`);
pristine.addValidator(textHashtags, validateHeshtagsUnique, 'Одинаковые хэш-теги');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showMessageSuccess();
          form.reset();
          resetFilters();
          resetScale();
        },
        () => {
          unblockSubmitButton();
          showMessageError();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, pristine};
