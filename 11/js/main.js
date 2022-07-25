import { getData } from './api.js';
import { generateThumbnails } from './thumbnails.js';
import { initialPopup } from './popup.js';
import { changeScale } from './scale.js';
import { initSlider } from './effects.js';
import { setUserFormSubmit } from './validation.js';
import { closeUploadFile } from './img-form.js';
import { setFilterClick } from './set-filters.js';
import { uploadFile } from './upload-file.js';

const RERENDER_DELAY = 500;

changeScale();
initSlider();
uploadFile();

getData((photos)=>{
  generateThumbnails(photos);
  initialPopup(photos);
  setTimeout(()=>setFilterClick(photos), RERENDER_DELAY);
});

setUserFormSubmit(closeUploadFile);