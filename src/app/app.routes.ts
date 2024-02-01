import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./Components/employee-list/employee-list.component";
import {EmployeeFormComponent} from "./Components/employee-form/employee-form.component";
import {authGuard} from "./auth.guard";
import {LandingPageComponent} from "./Components/landing-page/landing-page.component";
import {QualificationListComponent} from "./Components/qualification-list/qualification-list.component";
import {QualificationInsightComponent} from "./Components/qualification-insight/qualification-insight.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'qualifications', component: QualificationListComponent, canActivate: [authGuard] },
  { path: 'qualification/:id', component: QualificationInsightComponent, canActivate: [authGuard] }, //Placeholder
  { path: 'addemployee', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employee/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
];
