const imgPreview = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

effectSlider.classList.add('hidden');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const getfilterValue = (slaiderName,unit)=>{
  if (slaiderName === 'none') {
    imgPreview.style.filter = 'none';
    return;
  }

  effectSlider.noUiSlider.on('update', ()=>{
    effectLevelValue.value = effectSlider.noUiSlider.get();
    imgPreview.style.filter = `${slaiderName}(${effectLevelValue.value}${unit})`;
  });
};

const resetFilters = ()=>{
  effectSlider.classList.add('hidden');
  getfilterValue ('none');
};

const initSlider =()=>{
  const addEffects = (evt) => {
    const effect = evt.target.closest('.effects__radio');
    effectSlider.classList.remove('hidden');
    effectSlider.noUiSlider.off();

    if(effect){
      imgPreview.removeAttribute('class');
      imgPreview.classList.add(`effects__preview--${effect.value}`);
      if(effect.value === 'chrome'){
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        getfilterValue ('grayscale','');
      } else if(effect.value === 'sepia'){
        imgPreview.style = '';
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        getfilterValue ('sepia','');
      }else if (effect.value === 'phobos'){
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        getfilterValue ('blur', 'px');
      } else if (effect.value === 'heat') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        getfilterValue ('brightness', '');
      } else if (effect.value === 'marvin') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
        getfilterValue ('invert', '%');
      }
      if(effect.value === 'none'){
        resetFilters();
      }
    }
  };

  switch (effect.value) {

    case 'chrome':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      getfilterValue ('grayscale','');
      break;

    case 'Apples':
      console.log('Apples are $0.32 a pound.');
      break;
    case 'Bananas':
      console.log('Bananas are $0.48 a pound.');
      break;
    case 'Cherries':
      console.log('Cherries are $3.00 a pound.');
      break;

    default:
      resetFilters();
  }

  effectsList.addEventListener('click', addEffects);
};


export {initSlider, resetFilters};
