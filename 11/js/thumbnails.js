const generateThumbnails = (pictures) =>{
  const similarListElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const pictureFragment = document.createDocumentFragment();

  pictures.forEach(({likes, comments, url,id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.setAttribute('data-id', id);
    pictureFragment.appendChild(pictureElement);
  });

  similarListElement.appendChild(pictureFragment);
};

export {generateThumbnails};

