import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.module';
import { EmployeeGender } from '../../models/employeeGender.module';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public employees: Employee[];
  public employee: Employee;
  public done = false;
  public id: string;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    city: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(99)]),
    gender: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  get control(): any {
    return this.employeeForm.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.employee = this.apiService.findEmployee(this.id);
    const { firstName, lastName, city, age, gender, description } = this.employee;
    this.employeeForm.patchValue({firstName, lastName, city, age, gender: EmployeeGender[gender].toString(), description});
  }

  editEmployee() {
    this.done = true;
    if (this.employeeForm.invalid) {
      return;
    }

    this.employee.firstName = this.employeeForm.get('firstName').value;
    this.employee.lastName = this.employeeForm.get('lastName').value;
    this.employee.city = this.employeeForm.get('city').value;
    this.employee.age = this.employeeForm.get('age').value;
    this.employee.gender = EmployeeGender[this.employeeForm.get('gender').value];
    this.employee.description = this.employeeForm.get('description').value;

    this.navigateToMainPage(['/']);
  }

  navigateToMainPage(url): void {
    this.router.navigateByUrl(url);
  }
}
