import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {map, Observable, of} from "rxjs";
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
  protected showCancel = false;

  constructor(private router: Router, private http: HttpClient, private httpService: HttpService) {
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

  protected viewQuali(id: number){
    if(id > 0)
      this.router.navigateByUrl('/qualification/'+id.toString())
  }

  protected filterQualifications(input: HTMLInputElement):void{
    if(input.value === '')
      return;
    this.qualifications$ = this.qualifications$.pipe(
      map((qualifications: Qualification[]) => {
        return qualifications.filter((qualification) => {
          const filterString = `${qualification.id}, ${qualification.skill}`.split(" ").join("");
          return filterString.includes(input.value.split(" ").join(""));
        });
      })
    );
    this.showCancel = true;
  }

  protected cancelSearch(input: HTMLInputElement){
    this.fetchData();
    this.showCancel = false;
    input.value = '';
  }
}
