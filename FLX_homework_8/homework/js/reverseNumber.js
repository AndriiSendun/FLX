function reverseNumber(n) {
  const sign = Math.sign(n);
  let reverseNumber = 0;
  let number = Math.abs(n);

  while (number > 0) {
    let decimalPart = Math.ceil(number % 10);
    number = (number - decimalPart) / 10;
    reverseNumber = reverseNumber * 10 + decimalPart;
  }

  return sign * reverseNumber;
}
reverseNumber(321);
