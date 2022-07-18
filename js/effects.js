const effectsRadio = document.querySelectorAll('.effects__radio');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const sliderName = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];

effectSlider.classList.add('hidden');

const addEffects = (evt) => {
  const effect = evt.target.closest('.effects__radio');
  effectSlider.classList.remove('hidden');

  if(effect){
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${effect.id.slice(7)}`);

    if(effect.id.slice(7) === 'chrome'){
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      getfilterValue (sliderName[0],'');
    } else if(effect.id.slice(7) === 'sepia'){
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      getfilterValue (sliderName[1]);
    }else if (effect.id.slice(7) === 'phobos'){
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      getfilterValue (sliderName[3],'px');
    } else if (effect.id.slice(7) === 'heat') {
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else {
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
    if(effect.id.slice(7) === 'none'){
      effectSlider.classList.add('hidden');
    }
  }
};


effectsList.addEventListener('click', addEffects);

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

function getfilterValue (slaiderName,unit){
  effectSlider.noUiSlider.on('update', ()=>{
    effectLevelValue.value = effectSlider.noUiSlider.get();
    window.console.log(effectLevelValue.value);
    imgPreview.style.filter = `${slaiderName}(${effectSlider.noUiSlider.get()})${unit}`;
    imgPreview.filter = '';
  });
}


// effectsRadio.forEach((radio)=>{

// });
