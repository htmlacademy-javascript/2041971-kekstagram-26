const uploadFile = () => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const imgUploadInput = document.querySelector('.img-upload__input');
  const imgUploadPrewiew = document.querySelector('.img-upload__preview img');

  imgUploadInput.addEventListener('change', () => {
    const file = imgUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) =>  fileName.endsWith(it));
    if (matches) {
      imgUploadPrewiew.src = URL.createObjectURL(file);
    }
  });
};

export {uploadFile};
