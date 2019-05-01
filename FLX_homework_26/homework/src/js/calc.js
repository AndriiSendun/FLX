$(document).ready(function () {

  const $calculatorFields = $('.calculator__fields');
  const $calculatorLog = $('.calculator__log');
  const $calculatorResult = $('.calculator__result');
  const $body = $('body');
  const dataFunction = {
    'total': total,
    'clear': clearAllData,
    'storage': setStorage,
    'clearStorage': clearStorage
  };

  let logArray = [];

  $body.on('click keyup', function (e) {
    let data = null;
    if (e.type === 'keyup') {
      let pressedKey = $calculatorFields.children().filter(function () {
        return Object.values($(this).data())[0].toString() === e.key;
      });
      data = pressedKey.data();
    } else if (e.type === 'click') {
      data = $(e.target).data();
    }

    dataKey = Object.keys(data)[0];

    if(dataKey === 'value') {
      printLog(data);
    }

    if(e.ctrlKey && e.which === 77) {
      clearStorage();
    } else {
      dataFunction[dataKey]();
    }
  });

  function printLog(data) {
    if ($calculatorResult.text().trim().length > 0) {
      clearAllData();
    }
    logArray.push(data.value);
    logText(logArray.join(''));
  }

  function total() {
    try{
      const result = eval($calculatorLog.text());
      printResult(result);
    } catch (err) {
      try {
        withoutSecondArgument();
      } catch (err) {
        printResult('Impossible operation');
      }
    }
  }

  function withoutSecondArgument() {
    const index = logArray.findIndex((el) => typeof el === 'string');
    logArray.splice(index + 1, 0 , logArray[index-1]);
    printResult(eval(logArray.join('')));
  }

  function clearAllData() {
    printResult(' ');
    logArray = [];
    logText(' ');
  }

  function setStorage() {
    try {
      localStorage.setItem('calculator', eval(logText()));
    } catch(err) {
      printResult('Impossible to save data');
    }
  }

  function clearStorage() {
    const calculatorData = {
      value: parseFloat(localStorage.getItem('calculator'))
    };
    printLog(calculatorData);
    localStorage.removeItem('calculator');
  }

  function printResult(result) {
    $calculatorResult.text(result);
  }

  function logText(value) {
    if (value) {
      $calculatorLog.text(value);
    } else {
      return $calculatorLog.text();
    }
  }

});
