import {getRandomeInInclusie, debounce} from './util.js';
import {generateThumbnails} from './thumbnails.js';
import {initiatePopup} from './popup.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTO_MAX_COUNT = 10;

const removePhoto = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const comparePhotoByComments = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;
const getDiscussedPhotos = (photos) => photos.slice().sort(comparePhotoByComments);

const shufflePhoto = (photos) => {
  const photosCopy = photos.slice();
  const newPhotosCopy = [];
  while (newPhotosCopy.length <= RANDOM_PHOTO_MAX_COUNT) {
    const newPhotos = photosCopy.splice(getRandomeInInclusie(0, photosCopy.length-1), 1);
    newPhotosCopy.push(newPhotos[0]);
  }
  return newPhotosCopy;
};

const getRandomPhotos = (photos) => shufflePhoto(photos).slice(0,10);

const setFilterClick = (photos) => {
  const imgFilters = document.querySelector('.img-filters');
  const defaultButton = imgFilters.querySelector('#filter-default');
  const randomButton = imgFilters.querySelector('#filter-random');
  const discussedButton = imgFilters.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', debounce((evt) => renderFilters(evt), RERENDER_DELAY));

  function renderFilters (evt) {
    const filter = evt.target.closest('.img-filters__button');
    if (filter) {
      switch (filter.id) {

        case 'filter-random':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.add('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(getRandomPhotos(photos));
          initiatePopup(getRandomPhotos(photos));
          break;

        case 'filter-discussed':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.add('img-filters__button--active');
          removePhoto();
          generateThumbnails(getDiscussedPhotos(photos));
          initiatePopup(getDiscussedPhotos(photos));
          break;

        case 'filter-default':
          defaultButton.classList.add('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(photos);
          initiatePopup(photos);
          break;

        default:
          defaultButton.classList.add('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(photos);
          initiatePopup(photos);
      }
    }}
};

export {setFilterClick};
