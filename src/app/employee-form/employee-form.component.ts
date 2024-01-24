import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";

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

  protected employee: Employee = new Employee(-1,'','','','','','');

  constructor(private route: ActivatedRoute, private http: HttpClient) {
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
        // Hier können Sie jetzt auf die Inhalte von employee zugreifen
        console.log(this.employee);
      },
      error: (error) => {
        console.error('Es gab einen Fehler beim Abrufen des Mitarbeiters:', error);
      }
    });
  }

  protected onSubmit():void{
    if(this.isUpdate){
      this.http.put('/backend/employees/'+this.id, this.employee).subscribe({
        next: (response) => {
          console.log('Serverantwort: ',response);
        },
        error: (error) => {
          console.error('Fehler: ',error);
        }
      });
    }else{
      this.http.post('/backend/employees', this.employee).subscribe({
        next: (response) => {
          console.log('Serverantwort: ',response);
        },
        error: (error) => {
          console.error('Fehler: ',error);
        }
      });
    }
    window.location.href = window.location.origin+'/employees';
  }

}
