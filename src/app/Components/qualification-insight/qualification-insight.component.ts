import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Qualification} from "../../Models/Qualification";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpService} from "../../Services/http.service";
import {Employee} from "../../Models/Employee";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-qualification-insight',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  providers: [HttpService],
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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private httpService: HttpService, private modalService: NgbModal) {
    this.employees = [];
    this.qualification = new Qualification();
    this.id = null;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.fetchData();
    })
  }

  protected fetchData() : Promise<any> {
    return this.httpService.GetEmployeesByQualification(Number(this.id)).then((result) => {
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
    if (this.employees.length > 0) {
      let deleting : boolean = false;
      this.employees.forEach(value => {
        this.httpService.DeleteQualificationFromEmployee(value.id ?? -1, this.qualification.skill ?? "").then(value1 =>
        {
          this.fetchData().then(value2 => {
            if (this.employees.length == 0 && !deleting) {
              deleting = true;
              this.httpService.DeleteQualification(this.qualification.id ?? -1).then((result) => {
                if (result)
                  this.router.navigateByUrl('/qualifications')
              });
            }
          });
        });
      });
    }
    else {
      if (this.employees.length == 0) {
        this.httpService.DeleteQualification(this.qualification.id ?? -1).then((result) => {
          if (result)
            this.router.navigateByUrl('/qualifications')
        });
      }
    }
  }

  protected open(content: any) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'confirm') {
        this.router.navigateByUrl('/qualification/'+this.qualification.id);
      }
      if (result === 'confirmDelete')
        this.deleteQualification();
    });
  }

}
