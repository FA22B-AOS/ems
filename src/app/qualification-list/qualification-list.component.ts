import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../Qualification";
import {HTTPServiceService} from "../httpservice.service";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule],
  providers: [HTTPServiceService],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;

  constructor(private httpService: HTTPServiceService, private keycloak: KeycloakService) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  protected fetchData() {
    this.qualifications$ = this.httpService.GetQualifications();
  }

  protected addQuali(skill: HTMLInputElement):void{
    this.httpService.CreateQualification(skill.value).then((result) => {
      if(result)
        this.fetchData();
    });
    skill.value = '';
  }

  protected logout() {
    this.keycloak.logout('http://localhost:4200/');
  }

  protected viewQuali(id: number){
    if(id > 0)
      window.location.href = window.location.origin+'/qualification/'+id.toString();
  }
}
