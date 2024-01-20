import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {KeycloakAuthGuard} from "keycloak-angular";
import {StartComponent} from "./start/start.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'employee', component: EmployeeListComponent, canActivate: [authGuard] },
];
