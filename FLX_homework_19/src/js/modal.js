const startBtn = document.querySelector('.rules__btn-start');
const body = document.querySelector('.body');

startBtn.addEventListener('click', () => {
  const rules = document.querySelector('.rules');
  rules.remove();
  body.classList.remove('modal-state');
});

