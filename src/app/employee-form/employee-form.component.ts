import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Employee} from "../Employee";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [HttpService],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

  protected id: string | null = null;
  protected isUpdate: boolean = false;

  protected employee: Employee = new Employee(-1,'','','','','','',[]);
  protected qualifications$: Observable<Qualification[]>;
  private checkedIDs: number[] | undefined = undefined;

  @ViewChildren('checkboxRef') checkboxes!: QueryList<ElementRef>;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private modalService: NgbModal, private httpService: HttpService) {
    this.qualifications$ = of([]);
    this.fetchQualifications();
  }


  protected fetchQualifications() {
    this.qualifications$ = this.httpService.GetQualifications();
  }

  protected createQualification(inputRef: HTMLInputElement):void{
    this.updateCheckedIDs();
    this.httpService.CreateQualification(inputRef.value).then((result) => {
        this.fetchQualifications();
    }).catch((error) => {
      console.log(error);
    });
    inputRef.value = '';
  }

  protected open(content: any) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'confirm') {
        this.router.navigateByUrl('/employees');
      }
      if (result === 'confirmDelete')
        this.deleteEmployee();
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

  protected hasQualification(q: Qualification):boolean{
    if(typeof this.employee === 'undefined')
      return false;

    if(!(typeof this.checkedIDs === "undefined")){
      // @ts-ignore
      return this.checkedIDs.some((item) => {
        return item === q.id;
      })
    }else{
      // @ts-ignore
      return this.employee.skillSet.some(item => {
        if (typeof item === "number")
          return false;
        return item.id === q.id && item.skill === q.skill;
      });
    }
  }

  private updateCheckedIDs():void{
    this.checkedIDs = [];
    this.checkboxes.forEach((checkboxRef) => {
      const checkbox = checkboxRef.nativeElement;
      if (checkbox.checked) {
        const numStr = checkbox.id.replace(/\D/g, '');
        // @ts-ignore
        this.checkedIDs.push(parseInt(numStr, 10));
      }
    });
  }
  protected async onSubmit(): Promise<void> {
    if (this.employee.postcode?.length != 5)
      return;

    this.updateCheckedIDs();

    if (this.isUpdate) {
      this.httpService.UpdateEmployee(this.employee, this.checkedIDs ?? []).then((result) => {
        if(result)
          this.router.navigateByUrl('/employees');
      });
    } else {
      this.httpService.CreateEmployee(this.employee, this.checkedIDs ?? []).then((result) => {
        if(result)
          this.router.navigateByUrl('/employees');
      });
    }
  }

  protected deleteEmployee():void{
    this.httpService.DeleteEmployee(this.employee.id ?? -1).then((result) => {
      if(result)
        this.router.navigateByUrl('/employees');
    })
  }
}
