import { getData } from './api.js';
import { generateThumbnails } from './thumbnails.js';
import { initialPopup } from './popup.js';
import { changeScale } from './scale.js';
import { initSlider } from './effects.js';
import { setUserFormSubmit } from './validation.js';
import { closeUploadFile } from './img-form.js';
import { debounce } from './util.js';
import { setFilterClick } from './setFilters.js';

const RERENDER_DELAY = 500;

changeScale();
initSlider();

getData((photos)=>{
  generateThumbnails(photos);
  initialPopup(photos);
  setFilterClick(debounce(initialPopup, RERENDER_DELAY ), photos);
});

setUserFormSubmit(closeUploadFile);
