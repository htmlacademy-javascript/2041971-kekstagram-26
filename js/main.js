import { mockPhotos } from './data.js';
import { generateThumbnails } from './thumbnails.js';
import { initialPopup } from './popup.js';
import { uploadImgForm } from './img-form.js';
import { validateForm } from './validation.js';
import { changeScale } from './scale.js';
import {initSlider} from './effects.js';

generateThumbnails(mockPhotos);
initialPopup();
uploadImgForm();
validateForm();
changeScale();
initSlider();
