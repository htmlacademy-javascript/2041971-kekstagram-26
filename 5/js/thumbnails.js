import { getMockPhotos } from './data.js';

const similarListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureFragment = document.createDocumentFragment();

getMockPhotos.forEach((photo)=>{
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureFragment.appendChild(pictureElement);
});

similarListElement.appendChild(pictureFragment);
