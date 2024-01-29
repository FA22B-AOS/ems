import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "./Employee";
import {Qualification} from "./Qualification";
@Injectable({
  providedIn: 'root'
})
export class HTTPServiceService {

  constructor(private http: HttpClient) { }

  public CreateEmployee(postBody:Employee):void{
    this.http.post('/backend/employees', postBody).subscribe({
      next: (response) => {
        console.log('Serverantwort: ', response);
      },
      error: (error) => {
        console.error('Fehler: ', error);
      }
    });
  }

  public UpdateEmployee(putBody: Employee):void{
    this.http.put('/backend/employees/' + putBody.id, putBody).subscribe({
      next: (response) => {
        console.log('Serverantwort: ', response);
      },
      error: (error) => {
        console.error('Fehler: ', error);
      }
    });
  }

  public DeleteEmployee(id: number):void{
    this.http.delete('/backend/employees/'+id).subscribe({
      next: (response) => {
        console.log('Serverantwort: ', response);
      },
      error: (error) => {
        console.error('Fehler: ', error);
      }
    });
  }

  public CreateQualification(skill: string):void{
    let body = {
      "skill": skill
    }
    this.http.post('/backend/qualifications', body).subscribe({
      next: (response) => {
        console.log('Serverantwort: ',response);
      },
      error: (error) => {
        console.error('Fehler: ',error);
      }
    });
  }

  public UpdateQualification(putQualification: Qualification):void{
    this.http.put('/backend/qualifications/'+ putQualification.id, putQualification).subscribe({
      next: (response) => {
        console.log('Serverantwort: ',response);
      },
      error: (error) => {
        console.error('Fehler: ',error);
      }
    });
  }

  public DeleteQualification(id: number):void{
    this.http.delete('/backend/qualifications/'+id).subscribe({
      next: (response) => {
        console.log('Serverantwort: ',response);
      },
      error: (error) => {
        console.error('Fehler: ',error);
      }
    });
  }


}
