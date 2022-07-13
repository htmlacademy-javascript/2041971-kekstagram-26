import { isEscapeKey } from './util.js';
import { mockPhotos } from './data.js';

const initialPopup = () => {
  const bigPicture = document.querySelector('.big-picture');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  const pictureContainer = document.querySelector('.pictures');
  const commentItem = bigPicture.querySelector('.social__comment');

  const onPopupEscKeydown = (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      closeBigPicture();
    }
  };
  const showComments = (comment) => {
    const socialComments = bigPicture.querySelector('.social__comments');
    const commentFragment = document.createDocumentFragment();
    socialComments.innerHTML = '';

    comment.forEach(({avatar, name, message}) => {
      const commentElement = commentItem.cloneNode(true);
      const commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentFragment.append(commentElement);
    });
    socialComments.append(commentFragment);
  };
  const comCount = bigPicture.querySelector('.comments-count');

  const rendersBigPicture = ({url, likes, comments, description}) => {

    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    comCount.textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;

    showComments(comments);

  };

  function onButtonLoadShowComments (dataComments) {
    const count = 10;
    if(dataComments.length <= 5) {
      commentsLoader.classList.add('hidden');
    }
    if(dataComments.length < 5){
      socialCommentCount.textContent = `${count + dataComments.length%5} из ${comCount.textContent}`;
    } else {
      socialCommentCount.textContent = `${count} из ${comCount.textContent}`;
    }
    showComments(dataComments.splice(0,5));
  }

  const openBigPicture = (evt)=>{
    const picture = evt.target.closest('.picture');
    if(picture){
      const data = mockPhotos.find((photo) => +photo.id === +picture.dataset.id);
      rendersBigPicture(data);
      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onPopupEscKeydown);
      bigPictureCansel.addEventListener('click', closeBigPicture);


      if(data.comments.length > 5 ){
        commentsLoader.classList.remove('hidden');
        socialCommentCount.classList.remove('hidden');
        showComments(data.comments.splice(0,5));
        commentsLoader.addEventListener('click', () => onButtonLoadShowComments(data.comments));
      }
    }
  };

  pictureContainer.addEventListener('click', openBigPicture);

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPictureCansel.removeEventListener('click', closeBigPicture);
    commentsLoader.removeEventListener('click', onButtonLoadShowComments);
    socialCommentCount.textContent = `${5} из ${comCount.textContent}`;
  }
};

export {initialPopup};
