import { mockPhotos } from "./data.js";
import { generateThumbnails } from "./thumbnails.js";
import { initialPopup } from "./popup.js";

generateThumbnails(mockPhotos);
initialPopup();
