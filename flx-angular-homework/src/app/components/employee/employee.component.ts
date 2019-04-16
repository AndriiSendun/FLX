import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.module';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() removeEmployee: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }


  onRemoveEmployeeClick() {
    this.removeEmployee.emit(this.employee.id);
  }
}
