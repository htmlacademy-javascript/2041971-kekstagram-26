import { getData } from './api.js';
import { generateThumbnails } from './thumbnails.js';
import { initialPopup } from './popup.js';
import { changeScale } from './scale.js';
import { initSlider } from './effects.js';
import { setUserFormSubmit } from './validation.js';
import { closeUploadFile } from './img-form.js';

changeScale();
initSlider();

getData((photos)=>{
  generateThumbnails(photos);
  initialPopup(photos);
});

setUserFormSubmit(closeUploadFile);
