function* flat(arr) {
  if (arr instanceof Array) {
    for (let i = 0; i < arr.length; i++) {
      yield* flat(arr[i]);
    }
  } else {
    yield arr;
  }
}

var A = [1, [2, [3, 4], 5], 6];
for (let f of flat(A)) {
  console.log(f);
}
