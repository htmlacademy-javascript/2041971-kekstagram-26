import { isEscapeKey } from './util.js';

const initialPopup = (photos) => {
  const bigPicture = document.querySelector('.big-picture');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  const pictureContainer = document.querySelector('.pictures');
  const socialComments = bigPicture.querySelector('.social__comments');
  const commentItem = bigPicture.querySelector('.social__comment');

  const onPopupEscKeydown = (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const showComments = (comment) => {
    const commentFragment = document.createDocumentFragment();
    const commentsCurrentCount = socialCommentCount.querySelector('.comments__current-count');

    comment.forEach(({avatar, name, message}) => {
      const commentElement = commentItem.cloneNode(true);
      const commentAvatar = commentElement.querySelector('.social__picture');
      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentFragment.append(commentElement);
    });
    socialComments.append(commentFragment);
    commentsCurrentCount.textContent = socialComments.children.length;
  };

  const showCommentsCopy = (comments) =>{
    const copyComments = comments.slice();

    const onButtonLoadShowComments = () => {
      if(copyComments.length <= 5) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener ('click', onButtonLoadShowComments);
      }
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

  const rendersBigPicture = ({url, likes, comments, description}) => {
    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__caption').textContent = description;
  };


  const openBigPicture = (evt)=>{
    const picture = evt.target.closest('.picture');
    if(picture){
      const data = photos.find((photo) => +photo.id === +picture.dataset.id);
      rendersBigPicture(data);
      console.log(data);
      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onPopupEscKeydown);
      bigPictureCansel.addEventListener('click', closeBigPicture);

      socialComments.innerHTML = '';
      showCommentsCopy (data.comments);
    }
  };

  pictureContainer.addEventListener('click', openBigPicture);

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPictureCansel.removeEventListener('click', closeBigPicture);
  }
};

export {initialPopup};
