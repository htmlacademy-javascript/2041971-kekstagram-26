const setFilterClick = (getFunction, photos) =>{
  const imgFilters = document.querySelector('.img-filters');
  const defaultButton = imgFilters.querySelector('#filter-default');
  const randomButton = imgFilters.querySelector('#filter-random');
  const discussedButton = imgFilters.querySelector('#filter-discussed');

  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', renderFilters);
  function renderFilters (evt) {
    const filter = evt.target.closest('.img-filters__button');
    if(filter){
      const photosCopy = photos.splice();
      switch (filter.id) {

        case 'filter-random':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.add('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          getFunction(photosCopy.sort(() => Math.random()-0.5).slice(0,9));
          break;

        case 'filter-discussed':
          defaultButton.classList.remove('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.add('img-filters__button--active');
          break;

        case 'filter-default':
          defaultButton.classList.add('img-filters__button--active');
          randomButton.classList.remove('img-filters__button--active');
          discussedButton.classList.remove('img-filters__button--active');
          getFunction(photosCopy);
          break;

        default:
          getFunction(photosCopy);
      }
    }}
};
export {setFilterClick};
