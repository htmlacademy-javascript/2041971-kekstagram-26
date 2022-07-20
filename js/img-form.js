import { isEscapeKey } from './util.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgFile = document.querySelector('#upload-file');
const canselButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');


const closeUploadFile = () => {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFileCKeydown);
  canselButton.removeEventListener('click', closeUploadFile);
  imgFile.value = '';
};

function onUploadFileCKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFile();
  }
}

const uploadFile = () => {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFileCKeydown);
  canselButton.addEventListener('click', closeUploadFile);
};

imgFile.addEventListener('change', uploadFile);

const onFocusInputEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.stopPropagation();
  }
};
hashtagsInput.addEventListener('keydown', onFocusInputEscKeydown);
commentTextarea.addEventListener('keydown', onFocusInputEscKeydown);

export {closeUploadFile};
