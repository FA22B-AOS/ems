import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "../employee-list/employee-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  toggleSidebar() {
    // @ts-ignore
    document.querySelector(".sidebar-wrapper").classList.toggle("collapsed");
  }

}
