import {
  getComputerChoice
} from './computer-choise';
import {
  btnState,
  userScoreDiv,
  gameDiv,
  computerScoreDiv,
  gameInfo,
  resultField,
  btnReset,
  dictionary,
} from './game';

import '../less/styles.less';

let userScore = 0;
let computerScore = 0;
let counter = 1;

function game(userChoice, possibleBeat) {
  const computerChoice = getComputerChoice();
  const currentBattle = `${dictionary.get(userChoice)} vs. ${dictionary.get(computerChoice)}`;
  let decision;

  if (userChoice === computerChoice) {
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

  if (counter === 3) {
    const winner = userScoreDiv.innerHTML > computerScoreDiv.innerHTML ? 'USER' : 'COMPUTER';
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
