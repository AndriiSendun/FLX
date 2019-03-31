function* factorial(n) {
  let counter = 1;
  let result = 1;
  while (counter <= n) {
    yield result *= counter;
    counter++;
  }
}

for (var n of factorial(5)) {
  console.log(n);
}
