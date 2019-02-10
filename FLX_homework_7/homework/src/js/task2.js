
const start = confirm('Do you want to play a game?');
let prize = 0;
let numberRate = 1;
let amountRate = 1;
let possiblePrize;

if (start) {
  let again;
  let congratulation;
  let game;
  let attempts;

  do {
    attempts = 2;
    let number = Math.floor((Math.random() * 5 * numberRate));

    do {

      if (attempts === 2) {
        possiblePrize= 10 * amountRate;
      } else if (attempts === 1) {
        possiblePrize = 10 * amountRate / 2;
      } else {
        possiblePrize = Math.floor(5 * amountRate / 2);
      }

      game = parseFloat(prompt(`Enter a number from 0 to ${5 * numberRate}
                        Attempts left: ${attempts}
                        Total prize: ${prize}
                        Possible prize on current attempt: ${possiblePrize}
                        `));

      attempts--;
      congratulation = true;

      if (game === number) {
        prize += possiblePrize;
        congratulation = confirm(`Congratulation! Your prize is ${prize}.
        Do you want to continue?`);
        attempts = 2;
        amountRate = amountRate * 3;
        numberRate = numberRate * 2;
        number = Math.floor((Math.random() * 5 * numberRate));
      }

    } while (attempts >= 0 && congratulation);

    alert(`Thank you for a game. Your prize is ${prize}`);
    again = confirm('Do you want to play again');

    if (again) {
      prize = 0;
      numberRate = 1;
      amountRate = 1;
    }
    
  } while (again);
} else {
  alert('You did not become a millionaire, but can');
}
