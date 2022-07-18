const changeScale = ()=>{const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');
  const scaleValue = document.querySelector('.scale__control--value');
  const imgPreview = document.querySelector('.img-upload__preview');

  let scaleCarrentValue = +scaleValue.value.substring(0, scaleValue.value.length-1);

  const onScallButtonScallSmoller=()=>{
    if(scaleCarrentValue >=50 && scaleCarrentValue<=100){
      scaleCarrentValue -= 25;
      scaleValue.value = `${scaleCarrentValue}%`;
      imgPreview.style.transform = `scale(${+scaleCarrentValue/100})`;
    }
  };

  const onScallButtonScallBigger=()=>{
    if(scaleCarrentValue<=75 && scaleCarrentValue>=25){
      scaleCarrentValue += 25;
      scaleValue.value = `${scaleCarrentValue}%`;
      imgPreview.style.transform = `scale(${+scaleCarrentValue/100})`;
    }
  };

  scaleSmaller.addEventListener('click', onScallButtonScallSmoller);
  scaleBigger.addEventListener('click', onScallButtonScallBigger);
};
export {changeScale};
