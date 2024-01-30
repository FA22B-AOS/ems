import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";
import {HTTPServiceService} from "../httpservice.service";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [HTTPServiceService],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

  protected id: string | null = null;
  protected isUpdate: boolean = false;

  protected employee: Employee = new Employee(-1,'','','','','','',[]);
  protected qualifications$: Observable<Qualification[]>;
  @ViewChildren('checkboxRef') checkboxes!: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private modalService: NgbModal, private httpService: HTTPServiceService) {
    this.qualifications$ = of([]);
    this.fetchQualifications();
  }

  protected fetchQualifications() {
    this.qualifications$ = this.httpService.GetQualifications();
  }

  protected createQualification(inputRef: HTMLInputElement):void{
    this.httpService.CreateQualification(inputRef.value).then((result) => {
      if(result){
        this.fetchQualifications();
      }
    });
    inputRef.value = '';
  }

  protected open(content: any) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'confirm') {
        window.location.href = window.location.origin+'/employees';
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.isUpdate = this.id !== null;
    })

    if(this.isUpdate)
      this.getUserInfo();
  }

  private getUserInfo(): void{
    this.httpService.GetEmployee(Number(this.id)).then((result) => {
      this.employee = result;
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.employee.postcode?.length != 5)
      return;

    let idArray: number[] = [];

    this.checkboxes.forEach((checkboxRef) => {
      const checkbox = checkboxRef.nativeElement;
      if (checkbox.checked) {
        const numStr = checkbox.id.replace(/\D/g, '');
        idArray.push(parseInt(numStr, 10));
      }
    });

    this.employee.skillSet = idArray;


    if (this.isUpdate) {
      this.httpService.UpdateEmployee(this.employee).then((result) => {
        if(result)
          window.location.href = window.location.origin + '/employees';
      });
    } else {
      this.httpService.CreateEmployee(this.employee).then((result) => {
        if(result)
          window.location.href = window.location.origin + '/employees';
      });
    }
  }
}
