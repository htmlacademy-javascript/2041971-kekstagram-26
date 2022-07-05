import { isEscapeKey } from './util.js';
import { mockPhotos } from './data.js';

const initialPopup = () => {
  const bigPicture = document.querySelector('.big-picture');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  const pictureContainer = document.querySelector('.pictures');

  const onPopupClickOff = () => bigPictureCansel.addEventListener('click', () => {
    closeBigPicture();
  });

  const onPopupEscKeydown = () => document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      closeBigPicture();
    }
  });

  const rendersBigPicture = ({url, likes, comments, description}) => {

    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;

    const socialComments = bigPicture.querySelector('.social__comments');
    const commentItem = bigPicture.querySelector('.social__comment');
    const commentFragment = document.createDocumentFragment();
    socialComments.innerHTML = '';

    comments.forEach(({avatar, name, message}) => {
      const commentElement = commentItem.cloneNode(true);
      const commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentFragment.append(commentElement);
    });
    socialComments.append(commentFragment);
  };

  const openBigPicture = (evt)=>{
    const picture = evt.target.closest('.picture');
    const data = mockPhotos.find((photo) => +photo.id === +picture.dataset.id);
    console.log(data);
    rendersBigPicture(data);

    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscKeydown);
    bigPictureCansel.addEventListener('click', onPopupClickOff);
  };

  pictureContainer.addEventListener('click', openBigPicture);

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPictureCansel.removeEventListener('click', onPopupClickOff);
  }
};
export {initialPopup};
