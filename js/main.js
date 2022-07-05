import { mockPhotos } from "./data.js";
import { generateThumbnails } from "./thumbnails.js";
import { initialPopup } from "./popup.js";
import {uploadImgForm} from "./img-form.js";
import './validation.js';

generateThumbnails(mockPhotos);
initialPopup();
uploadImgForm();