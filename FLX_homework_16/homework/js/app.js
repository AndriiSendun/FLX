/**
 * TASK 1
 */

function assign(copyObject, ...originObject) {
  let temporaryObject = null;
  for (let i = 0; i < originObject.length; i++) {
    temporaryObject = originObject[i];

    for (let key in temporaryObject) {
      if (temporaryObject.hasOwnProperty(key)) {
        copyObject[key] = temporaryObject[key];
      }
    }
  }

  return copyObject;
}

/**
 * TASK 2
 */

function inheritance(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Bot({name, speed, x, y}) {
  this.name = name;
  this.speed = speed;
  this.x = x;
  this.y = y;

  this._defaultSpeed = speed;
  this.directionArr = [];
}

Bot.prototype.getName = function () {
  return this.name;
};

Bot.prototype.getSpeed = function () {
  return this.speed;
};

Bot.prototype.setSpeed = function (newSpeed) {
  this.speed = newSpeed;
};

Bot.prototype.getDefaultSpeed = function () {
  return this._defaultSpeed;
};

Bot.prototype.getCoordinates = function () {
  return {
    x: this.x,
    y: this.y
  };
};

Bot.prototype.setCoordinates = function ({x, y}) {
  this.x = x;
  this.y = y;
};

Bot.prototype.getDirection = function () {
  return this.directionArr;
};

Bot.prototype.addDirection = function (direction) {
  this.directionArr.push(direction);
};

Bot.prototype.calculateCords = function(direction) {
  let { x, y } = this.getCoordinates();

  switch (direction) {
    case 'up':
      return {
        x,
        y: y + this.getSpeed()
      };
    case 'down':
      return {
        x,
        y: y - this.getSpeed()
      };
    case 'left':
      return {
        x: x - this.getSpeed(),
        y
      };
    case 'right':
      return {
        x: x + this.getSpeed(),
        y
      };
    default:
      console.error('Direction specified badly');
      return false;
  }
};

Bot.prototype.move = function (direction) {
  this.setCoordinates(this.calculateCords(direction));
  this.addDirection(direction);
};

Bot.prototype.showPosition = function () {
  const {x, y} = this.getCoordinates();
  console.log(`I am ${this.constructor.name} '${this.getName()}'. I am located at ${x}:${y}`);
};

inheritance(Racebot, Bot);

function Racebot({name, speed, x, y}) {
  Bot.call(this, {name, speed, x, y});
}

Racebot.prototype.move = function (direction) {
  const directionArr = this.getDirection();
  const speed = direction === directionArr[directionArr.length - 1] ?
    this.getSpeed() + 1 :
    this.getDefaultSpeed();

  this.setSpeed(speed);

  /* get prototype of this (Racebot function constructor), then get prototype of (Racebot function constructor) */
  Object.getPrototypeOf(Object.getPrototypeOf(this)).move.call(this, direction);
};

inheritance(Speedbot, Bot);

function Speedbot({name, speed, x, y}) {
  Bot.call(this, {name, speed, x, y});
}

Speedbot.prototype.prepareEngine = function () {
  this.setSpeed(this.getSpeed() + 2);
};

Speedbot.prototype.move = function (direction) {
  Object.getPrototypeOf(Object.getPrototypeOf(this)).move.call(this, direction);

  const speed = this.getSpeed() !== this.getDefaultSpeed() ?
    this.getSpeed() - 1 :
    this.getDefaultSpeed();

  this.setSpeed(speed);
};

/* const defaults = {
  a: 123,
  b: 777
};
const options = {
  a: 456
};

const configs = assign({}, defaults, options); // {a: 456, b: 777}

console.log(configs);

let botty = new Bot({
  name: 'Betty',
  speed: 2,
  x: 0,
  y: 1
});

botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
botty.move('up');
botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
botty.move('left');
botty.move('down');
botty.move('up');
botty.move('up');
botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
botty.move('up');
botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
botty.move('up');
botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.

let zoom = new Racebot({
  name: 'Lightning',
  speed: 2,
  x: 0,
  y: 1
});

zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.
zoom.move('up');
zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
zoom.move('left');
zoom.move('down');
zoom.move('up');
zoom.move('up');
zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
zoom.move('up');
zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
zoom.move('up');
zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.

let broom = new Speedbot({
  name: 'Thunder',
  speed: 2,
  x: 0,
  y: 1
});

broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
broom.move('up');
broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
broom.prepareEngine();
broom.move('left');
broom.move('down');
broom.move('up');
broom.move('up');
broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
broom.move('up');
broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
broom.move('up');
broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8. */
