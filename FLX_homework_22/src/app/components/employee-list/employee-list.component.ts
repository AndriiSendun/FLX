import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.module';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @Input() searchText: string;

  public employees: Employee[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.employees = this.apiService.getEmployees();
  }

  onRemoveEmployeeClick(id) {
    this.employees = this.employees.filter(employee => employee.id !== id);
  }
}
