import {Component, HostBinding, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./Components/employee-list/employee-list.component";
import {SidebarComponent} from "./Components/sidebar/sidebar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, SidebarComponent, RouterOutlet],
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
