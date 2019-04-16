import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'employee/details/:id', component: DetailsPageComponent},
  {path: 'employee/create', component: CreatePageComponent},
  {path: 'employee/edit/:id' , component: EditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
