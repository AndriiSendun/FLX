function findTypes() {
  const result = [];
  for(let i = 0; i < arguments.length; i++) {
    result[i] = typeof arguments[i];
  }
  return result;
}

console.log(findTypes(5, 4, null));


function executeforEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

executeforEach([1, 2, 3, -1, 0], function (el) {
  console.log(el);
});


function mapArray(arr, callback) {
  const tempArr = [];
  executeforEach(arr, function (el, index, arr) {
    tempArr[index] = callback(el, index, arr);
  });

  return tempArr;
}

console.log(mapArray([1, 2, 3], function (el) {
  return (el + 3);
}));


function filterArray(arr, callback) {
  let result = [];
  executeforEach(arr, function (el, index, arr) {
    if (callback(el, index, arr)) {
      result.push(el);
    }
  });
  
  return result;
}

filterArray([2, 5, 8], function (el) {
  return el > 3;
});

const data = [{
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
];

function getAmountOfAdultPeople(peoples) {
  return filterArray(peoples, function (person) {
    return person.age > 18;
  }).length;
}

console.log(getAmountOfAdultPeople(data));

function getGreenAdultBananaLovers(peoples) {
  const filteredArr = filterArray(peoples, function (person) {
    return person.age > 18 && person.favoriteFruit === "banana" && person.eyeColor === "green";
  });

  return mapArray(filteredArr, function (person) {
    return person.name;
  });
}

console.log(getGreenAdultBananaLovers(data));

function keys(object) {
  let result = [];

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(key);
    }
  }

  return result;
}

keys({
  keyOne: 1,
  keyTwo: 2,
  keyThree: 3
});


function values(object) {
  let result = [];

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key]);
    }
  }

  return result;
}

values({
  keyOne: 1,
  keyTwo: 2,
  keyThree: 3
});

function showFormattedDate(date) {
  const monthList = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const month = monthList[date.getMonth()];

  return `Date: ${date.getDay()} of ${month}, ${date.getFullYear()}`;
}

showFormattedDate(new Date('2019-01-27T01:10:00'));

function isEvenYear(year) {
  return year.getFullYear() % 2 === 0;
}

isEvenYear(new Date('2019-01-27T01:10:00'));

function isEvenMonth(date) {
  return (date.getMonth() + 1) % 2 === 0;
}

isEvenMonth(new Date('2019-01-27T01:10:00'));

