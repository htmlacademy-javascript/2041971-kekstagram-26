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

  const rendersBigPicture = ({url, likes, comments, description}) => {

    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;

    showComments(comments);
  };

  const showCommentsCopy = (comments) =>{
    window.console.log(comments.length);
    const copyComments = comments.slice();

    const onButtonLoadShowComments = () => {
      if(copyComments.length <= 5) {
        commentsLoader.classList.add('hidden');
      }
      window.console.log(copyComments.length);
      showComments(copyComments.splice(0,5));
    };

    if (copyComments.length<=5){
      commentsLoader.classList.add('hidden');
      showComments(copyComments);
    } else {
      commentsLoader.classList.remove('hidden');
      socialCommentCount.classList.remove('hidden');
      showComments(copyComments.splice(0,5));

      commentsLoader.addEventListener ('click', onButtonLoadShowComments);
    }
  };

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

      showCommentsCopy(data.comments);
    }
  };

  pictureContainer.addEventListener('click', openBigPicture);

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPictureCansel.removeEventListener('click', closeBigPicture);
    //commentsLoader.removeEventListener('click', onButtonLoadShowComments);
  }
};

export {initialPopup};
