import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {KeycloakService} from "keycloak-angular";
import {TokenStorageService} from "../token-storage.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer: string = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU5Njg3ODYsImlhdCI6MTcwNTk2NTE4NiwianRpIjoiODVjYzVhMTctYTAzMy00NjA2LThiZDEtMTM1NDI3NDY3MDU5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJkMjU1YjYzZS03MmMwLTQ5NGUtODg0OC02ZDFmYTI0NGVhZDYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.fgkvohVZPsuEffkyGmSSmgWb-uKwli8zLdNXhbG-qdM4fsyYa6uuBqJAZY0cSw0EZdo_LBHvIYkFo_LqnuG9XUeC2pwsSoLQCvfuww6760n4T0vtUd3qsK5cfzNDj8ARr__OZt-V1ql2qNls4AzmkVBFPjy8daDzBlmyWXvLEnICgoTzIAVXzl5VfjBUAeI_pFbzWZru1LhZICjkhcGcdHO7QMUugBfYLjepr-h0o7jzr6VhRKCLJIHQfCQo5PBYGkkLh-dmhA6qZkBB-SV6HA5BMFhyXcigAT6RrAWlMtny4LfUYN91gFwO4kDMXdEufaM3r4e7VcPmkMLboHYrRw';
  employees$: Observable<Employee[]>;


  constructor(private http: HttpClient, private keycloak: KeycloakService, private tokenStorage: TokenStorageService) {
    this.employees$ = of([]);
    this.fetchData();

  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.tokenStorage.getBearerToken()}`)
    });
  }

  logout() {
    this.keycloak.logout('http://localhost:4200/');
  }
}
