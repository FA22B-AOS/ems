import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../Qualification";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;


  constructor(private http: HttpClient, private keycloak: KeycloakService) {
    this.employees$ = of([]);
    this.fetchData();

  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  logout() {
    this.keycloak.logout('http://localhost:4200/');
  }

  editEmployee(id: number){
    if(id > 0)
      window.location.href = window.location.origin+'/employee/'+id.toString();
  }

  addEmployee():void{
    window.location.href = window.location.origin+'/addemployee';
  }
}
