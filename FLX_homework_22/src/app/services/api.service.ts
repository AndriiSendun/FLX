import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.module';
import { EmployeeGender } from '../models/employeeGender.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public employees: Employee[] = [];

  constructor() { }

  addEmployee(id,
    firstName: string,
    lastName: string,
    age: number,
    city: string,
    gender: string,
    description: string) {
    this.employees.push(new Employee(id, firstName, lastName, age, city, gender, description));
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  findEmployee(id: string): Employee {
    return this.employees.find(employee => employee.id === parseFloat(id));
  }

  removeEmployee(employeeToRemove: Employee) {
    this.employees = this.employees.filter(employee => employee !== employeeToRemove);
  }
}
