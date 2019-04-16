import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreatePageComponent,
    EditPageComponent,
    DetailsPageComponent,
    EmployeeComponent,
    EmployeeListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
