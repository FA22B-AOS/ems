import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {KeycloakService} from "keycloak-angular";
import {HTTPServiceService} from "../httpservice.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HTTPServiceService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;


  constructor(private httpsService: HTTPServiceService, private keycloak: KeycloakService) {
    this.employees$ = of([]);
    this.fetchData();

  }

  protected fetchData() {
    this.employees$ = this.httpsService.GetEmployees();
  }

  protected logout() {
    this.keycloak.logout('http://localhost:4200/');
  }

  protected editEmployee(id: number){
    if(id > 0)
      window.location.href = window.location.origin+'/employee/'+id.toString();
  }

  protected addEmployee():void{
    window.location.href = window.location.origin+'/addemployee';
  }
}
