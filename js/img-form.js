import { isEscapeKey } from "./util.js";

const uploadImgForm = () => {
const imgUpload = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgFile = document.querySelector('#upload-file');
const canselButton = document.querySelector('#upload-cancel');

const uploadFile = () => {
 imgUpload.classList.remove('hidden');
 body.classList.add('modal-open');
 document.addEventListener('keydown', onUploadFileCKeydown);
 canselButton.addEventListener('click', onUploadFileClickOff);
};

imgFile.addEventListener('change', uploadFile);

const onUploadFileClickOff = () => canselButton.addEventListener('click', closeUploadFile());
const onUploadFileCKeydown = () => document.addEventListener('keydown', (evt)=>{
    if(isEscapeKey){
        evt.preventDefault();
        closeUploadFile();
    }
});

function closeUploadFile (){
    imgUpload.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onUploadFileCKeydown);
    canselButton.removeEventListener('click', onUploadFileClickOff);
    imgFile.value = '';
}
}

export {uploadImgForm};