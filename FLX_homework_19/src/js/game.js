let userScore = 0;
let computerScore = 0;
let counter = 1;
const userScoreDiv = document.querySelector('.user__score');
const gameDiv = document.querySelector('.game');
const computerScoreDiv = document.querySelector('.computer__score');
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const gameInfo = document.querySelector('.game-info');
const resultField = document.querySelector('.result');
const btnReset = document.querySelector('.btn-reset');
let dictionary = new Map();
dictionary
  .set('0', 'Rock')
  .set('1', 'Paper')
  .set('2', 'Scissors');

function getComputerChoice() {
  return parseInt(Math.random() * 3).toString();
}

function game (userChoice, possibleBeat) {
  const computerChoice = getComputerChoice();
  const currentBattle = `${dictionary.get(userChoice)} vs. ${dictionary.get(computerChoice)}`;
  let decision;

  if(userChoice === computerChoice) {
    decision = 'DRAW';
    ++userScore;
    ++computerScore;
  } else if (computerChoice === possibleBeat) {
    decision = 'You have WIN';
    ++userScore;
  } else {
    decision = 'You have LOST';
    ++computerScore;
  }

  drawScore();
  roundResult(currentBattle, decision);
  counter++;
}

function roundResult(currentBattle, decision) {
  const roundResultStr = `<div>Round ${counter}, ${currentBattle}, ${decision}</div>`;
  gameInfo.innerHTML += roundResultStr;

  if(counter === 3) {
    const winner = userScoreDiv.innerHTML > computerScoreDiv.innerHTML ? 'USER': 'COMPUTER';
    resultField.innerHTML = `The winner is ${winner}`;
    gameDiv.removeEventListener('click', choseHandler);
    btnState(true);
    return;
  }
}

function drawScore() {
  userScoreDiv.innerHTML = userScore;
  computerScoreDiv.innerHTML = computerScore;
}

function btnState(state) {
  [rock, paper, scissors].forEach((btn) => btn.disabled = state);
}

gameDiv.addEventListener('click', choseHandler);
btnReset.addEventListener('click', resetData);

function resetData() {
  userScore = 0;
  computerScore = 0;
  counter = 1;
  [resultField, gameInfo].forEach((element) => element.innerHTML = '');
  [userScoreDiv, computerScoreDiv].forEach((element) => element.innerHTML = 0);
  btnState(false);
  gameDiv.addEventListener('click', choseHandler);
}

function choseHandler(e) {
  const { value, beat } = e.target.closest('[data-value][data-beat]').dataset;
  game(value, beat);
}
