import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
