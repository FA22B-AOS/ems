import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isMobile : Boolean | undefined

  constructor(private keycloak: KeycloakService) {
  }

  toggleSidebar() {
    // @ts-ignore
    const sidebar = document.querySelector(".sidebar-wrapper");
    // @ts-ignore
    sidebar.classList.toggle("collapsed");

    // Remove the collapse class from all submenus
    const collapseElements = document.querySelectorAll('.collapse');
    // @ts-ignore
    for (const collapseElement of collapseElements) {
      collapseElement.classList.remove('show');
    }
  }

  toggleLinkClick(){
    // @ts-ignore
    const sidebar = document.querySelector(".sidebar-wrapper");
    // @ts-ignore
    if (sidebar.classList.contains("collapsed")){
      // @ts-ignore
      sidebar.classList.remove("collapsed");
    }

  }

  protected logout() {
    this.keycloak.logout('http://localhost:4200/');
  }
}
