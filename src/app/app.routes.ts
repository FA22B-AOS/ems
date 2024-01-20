import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent, canActivate: [authGuard] },
];
