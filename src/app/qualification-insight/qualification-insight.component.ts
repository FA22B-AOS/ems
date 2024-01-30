import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HTTPServiceService} from "../httpservice.service";
import {KeycloakService} from "keycloak-angular";
import {Employee} from "../Employee";

@Component({
  selector: 'app-qualification-insight',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HTTPServiceService],
  templateUrl: './qualification-insight.component.html',
  styleUrl: './qualification-insight.component.css'
})
export class QualificationInsightComponent {

  protected body = {
    "qualification": new Qualification,
    "employees": []
  }

  protected employees: Employee[];
  protected qualification: Qualification;
  protected id: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient,private httpService: HTTPServiceService, private keycloak: KeycloakService) {
    this.employees = [];
    this.qualification = new Qualification();
    this.id = null;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.fetchData();
    })
  }

  protected fetchData() {
    this.httpService.GetEmployeesByQualification(Number(this.id)).then((result) => {
      this.body = result;
      this.employees = this.body.employees;
      this.qualification = this.body.qualification;
    })
  }

  protected editEmployee(id: number){
    if(id > 0)
      window.location.href = window.location.origin+'/employee/'+id.toString();
  }
}
