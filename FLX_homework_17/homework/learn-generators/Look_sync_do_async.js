const fs = require('fs');

function run(generator) {
  const callback = generator(go);

  function go(err, result) {
    if (err) {
      return callback.throw(err);
    }

    callback.next(result);
  }

  go();
}

run(function* (done) {
  let firstFile;

  try {
    const dirFiles = yield fs.readdir('NoNoNoNo', done);
    firstFile = dirFiles[0];
  } catch (err) {
    firstFile = null;
  }

  console.log(firstFile);
});
