import { getData } from './api.js';
import { generateThumbnails } from './thumbnails.js';
import { initialPopup } from './popup.js';
import './img-form.js';
import { validateForm } from './validation.js';
import { changeScale } from './scale.js';
import {initSlider} from './effects.js';
import { setUserFormSubmit } from './validation.js';
import {closeUploadFile} from './img-form.js';


initialPopup();
validateForm();
changeScale();
initSlider();

getData((photos)=>{
  generateThumbnails(photos);
  initialPopup(photos);
});

setUserFormSubmit(closeUploadFile);
