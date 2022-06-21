import { getMockPhotos } from './data.js';

const similarListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureFragment = document.createDocumentFragment();

getMockPhotos.forEach(({likes, comments, url}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__img').src = url;
  pictureFragment.appendChild(pictureElement);
});

similarListElement.appendChild(pictureFragment);
