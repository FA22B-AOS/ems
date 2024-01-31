import {Component, HostBinding, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EMS';
  @HostBinding('class.mobile') isMobile = false;

  constructor() {
    this.isMobile = window.innerWidth < 600;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 600;
  }
}
