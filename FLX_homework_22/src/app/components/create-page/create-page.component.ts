import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

import { Employee } from '../../models/employee.module';
import { EmployeeGender } from '../../models/employeeGender.module';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public employees: Employee[];
  public done = false;

  constructor(private apiService: ApiService, private router: Router) { }

  employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    city: new FormControl('', Validators.required),
    age: new FormControl('16', [Validators.required, Validators.min(16), Validators.max(99)]),
    gender: new FormControl('2', Validators.required),
    description: new FormControl('', Validators.required),
  });

  get control(): any {
    return this.employeeForm.controls;
  }

  ngOnInit() {
  }

  createNewEmployee() {
    this.done = true;
    if (this.employeeForm.invalid) {
      return;
    }
    const { firstName, lastName, age, city, gender, description } = this.employeeForm.value;

    this.apiService.addEmployee(new Date().getTime(), firstName, lastName, age, city, EmployeeGender[gender], description);
    this.navigateToMainPage(['/']);
  }

  navigateToMainPage(url): void {
    this.router.navigateByUrl(url);
  }
}
