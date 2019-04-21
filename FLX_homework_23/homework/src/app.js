const _name = Symbol('name');
const _orderTotalPrice = Symbol('orderTotalPrice');
const _weekendDiscount = Symbol('weekendDiscount');
const _nightDiscount = Symbol('nightDiscount');
const _bonus = Symbol('bonus');

class User {
  constructor(name, orderTotalPrice, weekendDiscount, nightDiscount, bonus) {
    this[_name] = name;
    this[_orderTotalPrice] = orderTotalPrice;
    this[_weekendDiscount] = 1 + weekendDiscount / 100;
    this[_nightDiscount] = 1 + nightDiscount / 100;
    this[_bonus] = bonus;
  }

  getPrice() {
    return this[_orderTotalPrice];
  }

  getBonus() {
    return this[_bonus];
  }

  getNightDiscount() {
    return this[_nightDiscount];
  }

  getWeekendDiscount() {
    return this[_weekendDiscount];
  }

  makeOrder() {
    const result = parseFloat(this.getPrice() - this.getBonus().toFixed(2));
    const message = `Price after discount and including bonuses is ${result} e.g.`;
     console.log(message);
  }
}

const user1 = new User("Andrii", 1105, 10, 15, 400);

function getDiscount(user) {
  let price = user.getPrice();
  let day = new Date().getDay();
  let hours = new Date().getHours();
  let discount = (hours < 6 || hours > 23) ? user.getNightDiscount() : 1;
  discount = (day === 0 || day === 6) ? user.getWeekendDiscount() : 1;

  user.getPrice = function () {
    return price / discount;
  };
}


function setBonus(user) {
  let bonus = user.getBonus();
  let price = user.getPrice();
  let additionalBonus = 0;
  while (price >= 100) {
    price -= 100;
    additionalBonus += 5;
  }

  user.getBonus = function () {
    return bonus + additionalBonus;
  };
}

getDiscount(user1);
setBonus(user1);
user1.makeOrder();
