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

  let _logs = [];
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

      employee.hire(this);
      _logs.push(`${employee.getName()} starts working at ${this.name} in ${new Date()}`);
      if (_companyList.length >= this.maxCount) {
        const firedEmployee = _companyList.reduce((acc, cur) => {
          if (cur.getSalary() < acc.getSalary()) {
            return cur;
          }

          return acc;
        });
        this.removeEmployee(firedEmployee);
        _companyList.push(employee);
      } else {
        _companyList.push(employee);
      }
    } else {
      console.error('Please try to add Employee instance');
    }
  };

  this.removeEmployee = function (employeeToRemove) {
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
    const allEmployees = [];

    for (let i = 0; i < _companyList.length; i++) {
      allEmployees.push({
        name: _companyList[i].getName(),
        primarySkill: _companyList[i].getSkill(),
        age: _companyList[i].getAge(),
        salary: _companyList[i].getSalary(),
        id: _companyList[i].getId()
      });
    }

    return allEmployees;
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

  const id = generateUniqId();
  let workStatus = false;
  let totalWorkTime = 0;
  let _logs = [];
  let companyData;

  this.getWorkStatus = function () {
    return workStatus;
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
    return id;
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
    return this.getWorkSeconds(companyData.startTime);
  };

  this.getWorkTimeInSeconds = function () {
    if (totalWorkTime) {
      return this.getWorkSeconds(totalWorkTime);
    } else {
      return this.getWorkSeconds(companyData.startTime);
    }
  };

  this.hire = function (company) {
    workStatus = true;
    companyData = {
      name: company.name,
      startTime: new Date().getTime()
    };

    _logs.push(`${_name} is hired to ${companyData.name} in ${new Date()}`);
  };

  this.fire = function () {
    workStatus = false;
    totalWorkTime += companyData.startTime;

    _logs.push(`${_name} is fired from ${companyData.name} in ${new Date()}`);
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

let artem = new Employee("Artem", 15, 1000, "UX");
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

epam.removeEmployee(vasyl); //I add removeEmployee by employee;
console.log(vasyl.getHistory());

console.log(epam.getAverageSalary());
console.log(epam.getAverageAge());

epam.addNewEmployee(5, 6, 9, 5);

setTimeout(() => {
  epam.removeEmployee(vova);
  console.log(artem.getWorkTimeInSeconds());
}, 5000);


vova.setSalary(900);
vova.setSalary(2200);
console.log(vova.getHistory());
