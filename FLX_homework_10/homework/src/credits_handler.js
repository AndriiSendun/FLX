function userCard(key) {
  return {
    cardOptions: {
      key,
      balance: 100,
      transactionLimit: 100,
      historyLogs: []
    },

    getCardOptions() {
      return this.cardOptions;
    },

    putCredits(creditsAmount) {
      this.cardOptions.balance += creditsAmount;
      this.printHistoryLogs('Received credits', creditsAmount);
    },

    takeCredits(creditsAmount) {
      if (this.cardOptions.transactionLimit && this.cardOptions.balance > creditsAmount) {
        this.cardOptions.balance -= creditsAmount;
        this.printHistoryLogs('Withdrawal of credits', creditsAmount);
        return true;
      } else {
        console.error(`You do not have enough credits to make this operation,
        or transaction limit is low!`);
      }
    },

    setTransactionLimit(transactionAmount) {
      this.cardOptions.transactionLimit = transactionAmount;
      this.printHistoryLogs('Transaction limit change', transactionAmount);
    },

    transferCredits(creditsAmount, card) {
      const taxes = 0.005;
      const two = 2;
      const taxedCredits = parseFloat((creditsAmount * (1 + taxes)).toFixed(two));
      if (this.takeCredits(taxedCredits)) {
        card.putCredits(creditsAmount);
      }
    },

    printHistoryLogs(operationType, credits) {
      this.cardOptions.historyLogs.push({
        operationType,
        credits,
        operationTime: new Date().toLocaleString('en-US', {
          hour12: false
        })
      });
    }
  };
}

function UserAccount(name) {
  this.maxCard = 3;
  this.name = name;
  this.cards = [];
}

UserAccount.prototype.addCard = function () {
  if (this.cards.length < this.maxCard) {
    this.cards.push(userCard(this.cards.length + 1));
  } else {
    console.error(`${name} already have max number of card`);
  }
};

UserAccount.prototype.getCardByKey = function (key) {
  return this.cards.find(function (card) {
    return key === card.cardOptions.key;
  });
};

const two = 2;
const fiveHundred = 500;
const eightHundred = 800;
const threeHundred = 300;
const fifty = 50;

let user = new UserAccount('Bob');
user.addCard();
user.addCard();

let card1 = user.getCardByKey(1);
let card2 = user.getCardByKey(two);

card1.putCredits(fiveHundred);
card1.setTransactionLimit(eightHundred);
card1.transferCredits(threeHundred, card2);

card2.takeCredits(fifty);

console.log(card1.getCardOptions());
console.log(card2.getCardOptions());
