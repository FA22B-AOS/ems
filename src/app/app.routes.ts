import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeFormComponent} from "./employee-form/employee-form.component";
import {authGuard} from "./auth.guard";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {QualificationListComponent} from "./qualification-list/qualification-list.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'qualifications', component: QualificationListComponent, canActivate: [authGuard] },
  { path: 'qualification/:id', component: LandingPageComponent, canActivate: [authGuard] }, //Placeholder
  { path: 'addemployee', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employee/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
];
