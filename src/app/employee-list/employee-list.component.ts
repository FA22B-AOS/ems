import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {Employee} from "../Employee";
import {HTTPServiceService} from "../httpservice.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  providers: [HTTPServiceService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;


  constructor(private router: Router, private httpsService: HTTPServiceService) {
    this.employees$ = of([]);
    this.fetchData();

  }

  protected fetchData() {
    this.employees$ = this.httpsService.GetEmployees();
  }

  protected editEmployee(id: number){
    if(id > 0)
      this.router.navigateByUrl('/employee/'+id.toString());
  }

}
