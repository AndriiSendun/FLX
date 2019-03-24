const one = 1;
const two = 2;
const thousand = 1000;
const thirtySix = 36;
const nine = 9;

function Company(name, owner, maxCount) {
  if (!stringValidation(name, owner) || !numberValidation(maxCount)) {
    console.error('Wrong company DATA');
    return false;
  }

  this.name = name;
  this.owner = owner;
  this.maxCount = maxCount;

  const _logs = [];
  const _companyList = [];

  _logs.push(`${this.name} was created in ${new Date()}`);

  this.getAverage = function (targetArr) {
    const reducedTarget = targetArr.reduce((acc, cur) => acc + cur);

    return reducedTarget / _companyList.length;
  };

  this.addNewEmployee = function (employee) {
    if (employee instanceof Employee) {

      if (employee.getWorkStatus()) {
        console.error(`${employee.getName()} has already work`);
        return false;
      }

      if (_companyList.length >= this.maxCount) {
        const firedEmployee = _companyList.reduce((acc, cur) => {
          if (cur.getSalary() < acc.getSalary()) {
            return cur;
          }

          return acc;
        });
        this.removeEmployee(firedEmployee);
      }

      _companyList.push(employee);
      employee.hire(this);
      _logs.push(`${employee.getName()} starts working at ${this.name} in ${new Date()}`);

    } else {
      console.error('Please try to add Employee instance');
    }
  };

  this.removeEmployee = function (employeeToRemove) {
    employeeToRemove = typeof employeeToRemove === 'number' ? _companyList[employeeToRemove] : employeeToRemove;
    const employeeToRemoveId = employeeToRemove.getId();
    const removeEmployeeIndex = _companyList.findIndex((employee) => employee.getId() === employeeToRemoveId);

    if (~removeEmployeeIndex) {
      employeeToRemove.fire();
      _companyList.splice(removeEmployeeIndex, one);
    } else {
      console.error(`There is no employee with such id in company ${this.name}`);
    }
  };

  this.getAverageSalary = function () {
    const salaryArr = _companyList.map((employee) => employee.getSalary());

    return parseFloat(this.getAverage(salaryArr).toFixed(two));
  };

  this.getEmployees = function () {
    return _companyList.reduce((acc, cur) => {
      acc.push({
        name: cur.getName(),
        primarySkill: cur.getSkill(),
        age: cur.getAge(),
        salary: cur.getSalary(),
        id: cur.getId()
      });

      return acc;
    }, []);
  };

  this.getFormattedListOfEmployees = function () {
    const formattedList = _companyList.map((employee) => {
      return `${employee.getName()} - works in ${this.name} ${employee.getCurrentWorkTime()} seconds`;
    });

    return formattedList;
  };

  this.getAverageAge = function () {
    const ageArr = _companyList.map((employee) => employee.getAge());

    return parseFloat(this.getAverage(ageArr).toFixed(two));
  };

  this.getHistory = function () {
    return _logs;
  };
}

function Employee(name, age, salary, primarySkill) {
  if (!stringValidation(name, primarySkill) || !numberValidation(age, salary)) {
    console.error('Wrong employee DATA');
    return false;
  }

  const _name = name;
  const _primarySkill = primarySkill;
  const _age = age;
  let _salary = salary;

  const _id = generateUniqId();
  let _workStatus = false;
  let _totalWorkTime = 0;
  const _logs = [];
  let _companyData;

  this.getWorkStatus = function () {
    return _workStatus;
  };

  this.getName = function () {
    return _name;
  };

  this.getSkill = function () {
    return _primarySkill;
  };

  this.getAge = function () {
    return _age;
  };

  this.getSalary = function () {
    return _salary;
  };

  this.getId = function () {
    return _id;
  };

  this.getWorkSeconds = function (time) {
    return parseFloat((new Date().getTime() - time) / thousand);
  };

  this.setSalary = function (newSalary) {
    if (newSalary > _salary) {
      _logs.push(`change salary from ${_salary} to ${newSalary}`);
      _salary = parseFloat(newSalary.toFixed(two));
    } else if (newSalary < _salary) {
      _logs.push(`try to change salary from ${_salary} to ${newSalary}`);
    } else if (!numberValidation(newSalary)) {
      console.error(`New salary:${newSalary} is not a number`);
    }
  };

  this.getCurrentWorkTime = function () {
    return this.getWorkSeconds(_companyData.startTime);
  };

  this.getWorkTimeInSeconds = function () {
    if (_totalWorkTime && _companyData) {
      return _totalWorkTime + this.getCurrentWorkTime();
    } else if (_companyData) {
      return this.getCurrentWorkTime();
    } else {
      return _totalWorkTime;
    }
  };

  this.hire = function (company) {
    _workStatus = true;
    _companyData = {
      name: company.name,
      startTime: new Date().getTime()
    };

    _logs.push(`${_name} is hired to ${_companyData.name} in ${new Date()}`);
  };

  this.fire = function () {
    _workStatus = false;
    _totalWorkTime += this.getCurrentWorkTime();

    _logs.push(`${_name} is fired from ${_companyData.name} in ${new Date()}`);
    _companyData = null;
  };

  this.getHistory = function () {
    return _logs;
  };
}

function generateUniqId() {
  return generateUniqString() + '_' + generateUniqString();
}

function generateUniqString() {
  return Math.random().toString(thirtySix).substr(two, nine);
}

function validation(regExp, target) {
  return target.filter(el => regExp.test(el));
}

function stringValidation(...arg) {
  const regExp = /[A-Z\s]/gi;
  const testedArr = validation(regExp, arg);
  return testedArr.length === arg.length;
}

function numberValidation(...arg) {
  const regExp = /\d+/gi;
  const testedArr = validation(regExp, arg);
  return testedArr.length === arg.length;
}

/* let artem = new Employee("Artem", 15, 1000, "UX");
let vova = new Employee("Vova", 16, 2000, "BE");
let vasyl = new Employee("Vasyl", 25, 1000, "FE");
let ivan = new Employee("Ivan", 35, 5000, "FE");
let orest = new Employee("Orest", 29, 300, "AT");
let anton = new Employee("Anton", 19, 500, "Manager");

let epam = new Company("Epam", "Arkadii", 5);
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);

console.log(epam.getHistory());

epam.removeEmployee(2);
console.log(vasyl.getHistory());

console.log(epam.getAverageSalary());
console.log(epam.getAverageAge());

epam.addNewEmployee(5, 6, 9, 5);

setTimeout(() => {
  epam.removeEmployee(1);
  console.log(artem.getWorkTimeInSeconds()); // -&gt; 5.5744444444444445
}, 5000);



vova.setSalary(900);
vova.setSalary(2200);
console.log(vova.getHistory());
console.log(epam.getEmployees()); */
