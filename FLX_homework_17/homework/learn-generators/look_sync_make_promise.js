function askFoo() {
  return new Promise(function (resolve, reject) {
    resolve('foo');
  });
}

function run(generator) {
  const callback = generator();

  callback.next().value.then((promValue) => {
    return callback.next(promValue);
  }, (err) => {
    return callback.throw(err);
  });
}

run(function* () {
  try {
    let foo = yield askFoo();
    console.log(foo);
  } catch (err) {
    console.log('foo');
  }
});
