import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Employee} from "./Employee";
import {Qualification} from "./Qualification";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HTTPServiceService {

  constructor(private http: HttpClient) { }

  public CreateEmployee(postBody:Employee):Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.post('/backend/employees', postBody).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
          resolve(true);
        },
        error: (error) => {
          console.error('Fehler: ', error);
          resolve(false);
        }
      });
    });
  }

  public UpdateEmployee(putBody: Employee):Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.put('/backend/employees/'+putBody.id, putBody).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
          resolve(true);
        },
        error: (error) => {
          console.error('Fehler: ', error);
          resolve(false);
        }
      });
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

  public GetEmployee(id: number):Promise<Employee>{
    return new Promise((resolve, reject) => {
      this.http.get<Employee>('/backend/employees/'+id).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
          resolve(response);
        },
        error: (error) => {
          console.error('Fehler: ', error);
          resolve(error);
        }
      });
    });
  }

  public GetEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  public CreateQualification(skill: string): Promise<boolean> {
    let body = {
      "skill": skill
    };
    return new Promise((resolve, reject) => {
      this.http.post('/backend/qualifications', body).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
          resolve(true);
        },
        error: (error) => {
          console.error('Fehler: ', error);
          resolve(false);
        }
      });
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

  public GetQualifications():Observable<Qualification[]>{
    return this.http.get<Qualification[]>('/backend/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  public GetEmployeesByQualification(id: number):Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get<any>('/backend/qualifications/'+id+'/employees', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')

      }).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
          resolve(response);
        },
        error: (error) => {
          console.error('Fehler: ', error);
          resolve(error);
        }
      });
    });
  }

  public DeleteQualificationFromEmployee(id: number, skill:string):Promise<boolean>{
    let requestBody = {
      "skill": skill
    }
    return new Promise((resolve, reject) => {
      this.http.delete('/backend/employees/'+id+'/qualifications',{
        body: (requestBody)
      }).subscribe({
        next: (response) => {
          console.log('Serverantwort: ', response);
          resolve(true);
        },
        error: (error) => {
          console.error('Fehler: ', error);
          resolve(false);
        }
      })
    })
  }

}
