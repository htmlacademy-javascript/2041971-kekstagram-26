import { isEscapeKey } from './util.js';

const uploadImgForm = () => {

  const imgUpload = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');
  const imgFile = document.querySelector('#upload-file');
  const canselButton = document.querySelector('#upload-cancel');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentTextarea = document.querySelector('.text__description');

  const onUploadFileClickOff = () => canselButton.addEventListener('click', closeUploadFile());
  const onUploadFileCKeydown = () => document.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      closeUploadFile();
    }
  });

  const uploadFile = () => {
    imgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadFileCKeydown);
    canselButton.addEventListener('click', onUploadFileClickOff);
  };

  imgFile.addEventListener('change', uploadFile);

  function closeUploadFile() {
    imgUpload.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onUploadFileCKeydown);
    canselButton.removeEventListener('click', onUploadFileClickOff);
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
