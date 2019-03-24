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
  const actions = {
    add: 'Adding new employee',
    fire: 'Fire employee',
    averageSalary: 'Checking of average salary',
    employees: 'Check information about employees',
    averageAge: 'Checking of average age'
  };

  this.getAverage = function (targetArr) {
    const reducedTarget = targetArr.reduce((acc, cur) => acc + cur);

    return reducedTarget / _companyList.length;
  };

  this.addLog = function (action) {
    _logs.push({
      action,
      actionTime: new Date().toLocaleString('en-US', {
        hour12: false
      })
    });
  };

  this.addNewEmployee = function (employee) {
    if (employee instanceof Employee) {

      if (employee.getWorkStatus()) {
        console.error(`${employee.getName()} has already work`);
        return false;
      }

      employee.hire(this);

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

      this.addLog(actions.add);
    } else {
      console.error('You have pass wrong arguments');
    }
  };

  this.removeEmployee = function (employeeToRemove) {
    const employeeToRemoveId = employeeToRemove.getId();
    const removeEmployeeIndex = _companyList.findIndex((employee) => employee.getId() === employeeToRemoveId);

    if (~removeEmployeeIndex) {

      employeeToRemove.fire();
      _companyList.splice(removeEmployeeIndex, one);
      this.addLog(actions.fire);
    } else {
      console.error(`There is no employee with such id in company ${this.name}`);
    }
  };

  this.getAverageSalary = function () {
    const salaryArr = _companyList.map((employee) => employee.getSalary());
    this.addLog(actions.averageSalary);

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

    this.addLog(actions.employees);

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
    this.addLog(actions.averageAge);

    return Math.round(this.getAverage(ageArr));
  };

  this.getHistory = function () {
    return _logs;
  };
}

function Employee(name, primarySkill, age, salary) {
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
  const actions = {
    fire: 'You are fired',
    hire: 'You are hire'
  };

  this.addLog = function (action) {
    _logs.push({
      action,
      actionTime: new Date().toLocaleString('en-US', {
        hour12: false
      })
    });
  };

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
    return parseInt((new Date().getTime() - time) / thousand);
  };

  this.setSalary = function (newSalary) {
    if (newSalary > _salary) {
      _salary = parseFloat(newSalary.toFixed(two));
    } else if (newSalary < _salary) {
      console.error('Cannot set smaller salary than employee has now');
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

    this.addLog(actions.hire);
  };

  this.fire = function () {
    workStatus = false;
    totalWorkTime += companyData.startTime;
    companyData = null;

    this.addLog(actions.fire);
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


/* const company1 = new Company('Microsoft', 'Bill Gates', 2);
const company2 = new Company('Apple', 'Steve Jobs', 3);
const company3 = new Company('123', 'bill', 2);
const company4 = new Company('Intel', 'Gordon Moore', 2);


const emp1 = new Employee('Adam1', 'soft', 20, 2500);
const emp2 = new Employee('Adam2', 'soft', 25, 2500);
const emp3 = new Employee('Adam3', 'soft', 27, 3000);
const emp4 = new Employee('Adam4', 'soft', 25, 2500);
const emp5 = new Employee('Adam5', 'soft', 29, 2500);
const emp6 = new Employee('123', 'soft', 29, 2500);
const emp7 = new Employee('Adam 7', 'soft', 29, 2500);


company1.addNewEmployee(emp1);
company1.addNewEmployee(emp2);
company1.addNewEmployee(emp3);

company2.addNewEmployee(emp1);
company2.addNewEmployee(emp4);
company2.addNewEmployee(emp5);

company2.removeEmployee(emp5);

console.log(company1.getAverageAge());
console.log(company2.getAverageAge());

console.log(company1.getAverageSalary());
console.log(company2.getAverageSalary());

console.table(company1.getEmployees());
console.table(company2.getEmployees());

console.log(company1.getFormattedListOfEmployees());
console.log(company1.getHistory());

console.log(emp1.getSalary());

emp1.setSalary('str');
emp1.setSalary(4352);

console.log(emp1.getSalary());
console.log(company2.getAverageSalary());
console.table(company2.getEmployees());
console.log(emp1.getHistory());
console.log(emp1.getWorkTimeInSeconds()); */
