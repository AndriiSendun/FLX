const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const startBtn = document.querySelector('.rules__btn-start');
const body = document.querySelector('.body');

export const userScoreDiv = document.querySelector('.user__score');
export const gameDiv = document.querySelector('.game');
export const computerScoreDiv = document.querySelector('.computer__score');
export const gameInfo = document.querySelector('.game-info');
export const resultField = document.querySelector('.result');
export const btnReset = document.querySelector('.btn-reset');
export let dictionary = new Map();
dictionary
  .set('0', 'Rock')
  .set('1', 'Paper')
  .set('2', 'Scissors');

startBtn.addEventListener('click', () => {
  const rules = document.querySelector('.rules');
  rules.remove();
  body.classList.remove('modal-state');
});

export function btnState(state) {
  [rock, paper, scissors].forEach((btn) => btn.disabled = state);
}
