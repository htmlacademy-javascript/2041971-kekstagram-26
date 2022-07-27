import { getRandomeInInclusie, debounce } from './util.js';
import { generateThumbnails } from './thumbnails.js';
import { initialPopup } from './popup.js';

const RERENDER_DELAY = 500;
const removePhoto = ()=>{
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo)=>photo.remove());
};

const comparePhotoByComments = (firstPhoto, secondPhoto) =>secondPhoto.comments.length - firstPhoto.comments.length;
const getDiscussedPhotos = (photos) => photos.slice().sort(comparePhotoByComments);

const shufflePhoto = (photos) => {
  const photosCopy = photos.slice();
  const newPhotosArray = [];
  while (newPhotosArray.length <=10){
    const photo = photosCopy.splice(getRandomeInInclusie(0,photosCopy.length-1), 1);
    newPhotosArray.push(photo[0]);
  }
  return newPhotosArray;
};

const getRandomPhotos = (photos) => shufflePhoto(photos).slice(0,10);

const setFilterClick = (photos) =>{
  const imgFilters = document.querySelector('.img-filters');
  const defaultButton = imgFilters.querySelector('#filter-default');
  const randomButton = imgFilters.querySelector('#filter-random');
  const discussedButton = imgFilters.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', debounce((evt)=>renderFilters(evt), RERENDER_DELAY));

  function renderFilters (evt) {
    const filter = evt.target.closest('.img-filters__button');
    if(filter){
      switch (filter.id) {

        case 'filter-random':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.add('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(getRandomPhotos(photos));
          initialPopup(getRandomPhotos(photos));
          console.log(getRandomPhotos(photos));
          break;

        case 'filter-discussed':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.add('img-filters__button--active');
          removePhoto();
          generateThumbnails(getDiscussedPhotos(photos));
          initialPopup(getDiscussedPhotos(photos));
          break;

        case 'filter-default':
          defaultButton.classList.add('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(photos);
          initialPopup(photos);
          break;

        default:
          defaultButton.classList.add('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          removePhoto();
          generateThumbnails(photos);
          initialPopup(photos);
      }
    }}
};
export {setFilterClick};
