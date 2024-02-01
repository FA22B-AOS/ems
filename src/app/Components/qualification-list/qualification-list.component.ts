import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {Qualification} from "../../Models/Qualification";
import {HttpService} from "../../Services/http.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HttpService],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;

  constructor(private router: Router, private http: HttpClient, private httpService: HttpService, private keycloak: KeycloakService) {
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
      this.router.navigateByUrl('/qualification/'+id.toString())
  }
}
