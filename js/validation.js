import {sendData} from './api.js';
import {showMessageSuccess, showMessageError} from './messages.js';
import {resetFilters} from './effects.js';
import {resetScale} from './scale.js';

const MAX_COUNT_HASHTAGS = 5;
const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new window.Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHashtags = (value) => {
  const hashtagsElements = getArrayHashtags(value);
  const regex = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| hashtagsElements.every((hashtag) => regex.test(hashtag));
};

const validateCountHashtags = (value) => {
  const hashtagsElements = getArrayHashtags(value);
  return hashtagsElements.length <= MAX_COUNT_HASHTAGS;
};

const validateHashtagsUnique = (value) => {
  const hashtagsElements = getArrayHashtags(value);
  const set = new Set(hashtagsElements);
  return (set.size === hashtagsElements.length);
};

pristine.addValidator(textHashtags, validateHashtags, 'Неверный формат хэш-тега');
pristine.addValidator(textHashtags, validateCountHashtags, `Максимум ${MAX_COUNT_HASHTAGS} хэш-тегов`);
pristine.addValidator(textHashtags, validateHashtagsUnique, 'Одинаковые хэш-теги');

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
