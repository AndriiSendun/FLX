import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employee } from '../../models/employee.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  public employee: Employee;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    const id = this.router.url.split('/').pop();
    this.employee = this.apiService.findEmployee(id);
  }

  onRemoveEmployeeClick() {
    this.apiService.removeEmployee(this.employee);
  }

}
