import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {map, Observable, of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {Employee} from "../../Models/Employee";
import {HttpService} from "../../Services/http.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  providers: [HttpService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;
  protected showCancel = false;


  constructor(private router: Router, private httpsService: HttpService) {
    this.employees$ = of([]);
    this.fetchData();

  }

  protected fetchData() {
    this.employees$ = this.httpsService.GetEmployees();
  }

  protected filterEmployees(input: HTMLInputElement):void{
    if(input.value === '')
      return;
    this.employees$ = this.employees$.pipe(
      map((employees: Employee[]) => {
        return employees.filter((employee) => {
          const filterString = `${employee.id},${employee.lastName},${employee.firstName}`.split(" ").join("");
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

  protected editEmployee(id: number){
    if(id > 0)
      this.router.navigateByUrl('/employee/'+id.toString());
  }

}
