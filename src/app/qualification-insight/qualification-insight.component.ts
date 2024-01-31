import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HTTPServiceService} from "../httpservice.service";
import {KeycloakService} from "keycloak-angular";
import {Employee} from "../Employee";
import {Router} from "@angular/router";

@Component({
  selector: 'app-qualification-insight',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private httpService: HTTPServiceService, private keycloak: KeycloakService) {
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
      this.router.navigateByUrl('/employee/'+id.toString());
  }

  protected removeEmployee(id: number):void{
    this.httpService.DeleteQualificationFromEmployee(id,this.qualification.skill ?? '').then((result) => {
      if(result)
        this.fetchData();
    })
  }

  protected changeName(input: HTMLInputElement):void{
    this.qualification.skill = input.value;
    this.httpService.UpdateQualification(this.qualification);
    input.value = '';
  }

  protected deleteQualification() : void  {
    if (this.employees.length == 0 || confirm('Es haben noch Mitarbeiter die Qualifikation, soll sie trotzdem gelöscht werden?')) {
      this.employees.forEach(value => {
        this.httpService.DeleteQualificationFromEmployee(value.id ?? -1, this.qualification.skill ?? "");
      });

      this.httpService.DeleteQualification(this.qualification.id ?? -1).then((result) => {
        if (result)
          this.router.navigateByUrl('/qualifications')
      });
    }
  }
}
