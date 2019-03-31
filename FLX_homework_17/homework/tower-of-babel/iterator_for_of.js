const max = +process.argv[2];
const FizzBuzz = {
  [Symbol.iterator]() {
    let number = 1;

    return {
      next() {
        if (number > max) {
          return { done: true };
        }

        let value = number;
        if (number % 3 === 0 && number % 5 === 0) {
          value = 'FizzBuzz';
        } else if (number % 3 === 0) {
          value = 'Fizz';
        } else if (number % 5 === 0) {
          value = 'Buzz';
        }
        number++;

        return {
          done: false,
          value
        };
      }
    };
  }
};

for (let number of FizzBuzz) {
  console.log(number);
}
