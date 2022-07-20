const showMessage = ()=>{
  const messegeTemplate = document.querySelector('#success')
    .content
    .querySelector('.success__inner');
  const body = document.querySelector('body');
  window.console.log(messegeTemplate);

  const messegeElement = messegeTemplate.cloneNode(true);
  body.appendChild(messegeElement);
};
export {showMessage};


