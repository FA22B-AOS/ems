import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../Qualification";
import {HTTPServiceService} from "../httpservice.service";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HTTPServiceService],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;


  constructor(private http: HttpClient, private keycloak: KeycloakService, private httpService: HTTPServiceService) {
    this.qualifications$ = of([]);
    this.fetchData();

  }

  fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('/backend/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  protected addQuali(skill: HTMLInputElement):void{
    this.httpService.CreateQualification(skill.value).then((result) => {
      if(result)
        this.fetchData();
    });
    skill.value = '';
  }

  logout() {
    this.keycloak.logout('http://localhost:4200/');
  }

  viewQuali(id: number){
    if(id > 0)
      window.location.href = window.location.origin+'/qualification/'+id.toString();
  }

  addEmployee():void{
    window.location.href = window.location.origin+'/addemployee';
  }
}
