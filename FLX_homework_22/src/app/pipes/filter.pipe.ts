import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.module';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!employees) { return []; }
    if (!searchText) { return employees; }

    searchText = searchText.toLowerCase();
    return employees.filter(({ firstName, lastName }) => {
      return firstName.toLowerCase().includes(searchText) || lastName.toLowerCase().includes(searchText);
    });
  }
}

