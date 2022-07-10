import { isEscapeKey } from './util.js';

const uploadImgForm = () => {

  const imgUpload = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');
  const imgFile = document.querySelector('#upload-file');
  const canselButton = document.querySelector('#upload-cancel');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentTextarea = document.querySelector('.text__description');

  const onUploadFileCKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUploadFile();
    }
  };

  const uploadFile = () => {
    imgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadFileCKeydown);
    canselButton.addEventListener('click', closeUploadFile);
  };

  imgFile.addEventListener('change', uploadFile);

  function closeUploadFile() {
    imgUpload.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onUploadFileCKeydown);
    canselButton.removeEventListener('click', closeUploadFile);
    imgFile.value = '';
  }

  const onFocusInputEscKeydown = (evt) => {
    if(isEscapeKey(evt)){
      evt.stopPropagation();
    }
  };
  hashtagsInput.addEventListener('keydown', onFocusInputEscKeydown);
  commentTextarea.addEventListener('keydown', onFocusInputEscKeydown);
};

export { uploadImgForm };
