import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

  protected id: string | null = null;
  protected isUpdate: boolean = false;

  protected employee: Employee = new Employee(-1,'','','','','','',[]);
  protected qualifications$: Observable<Qualification[]>;
  @ViewChildren('checkboxRef') checkboxes!: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private modalService: NgbModal) {
    this.qualifications$ = of([]);
    this.fetchQualifications();
  }

  protected fetchQualifications() {
    this.qualifications$ = this.http.get<Employee[]>('/backend/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  protected createQualification(inputRef: HTMLInputElement):void{
    let body = {
      skill: inputRef.value
    }
    this.http.post('/backend/qualifications', body).subscribe({
      next: (response) => {
        console.log('Serverantwort: ',response);
        this.fetchQualifications();
        inputRef.value = '';
      },
      error: (error) => {
        console.error('Fehler: ',error);
        inputRef.value = '';
      }
    });
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
    this.http.get<Employee>('/backend/employees/' + this.id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe({
      next: (data: Employee) => {
        this.employee = data;
      },
      error: (error) => {
        console.error('Es gab einen Fehler beim Abrufen des Mitarbeiters:', error);
      }
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
      this.http.put('/backend/employees/' + this.id, this.employee).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
        },
        error: (error) => {
          console.error('Fehler: ', error);
        }
      });
    } else {
      this.http.post('/backend/employees', this.employee).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
        },
        error: (error) => {
          console.error('Fehler: ', error);
        }
      });
    }
    window.location.href = window.location.origin + '/employees';
  }
}
