import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(protected keycloak: KeycloakService) {
  }

  toggleSidebar() {
    const sidebarElement = document.querySelector(".sidebar-wrapper") as HTMLDivElement;
    sidebarElement.classList.toggle("collapsed");

    const sidebarTogglerIcon = document.querySelector(".sidebar-toggler i") as HTMLSpanElement;

    if (!sidebarElement.classList.contains("collapsed")) {
      sidebarTogglerIcon.classList.add("bi-x-lg");
    } else {
      sidebarTogglerIcon.classList.remove("bi-x-lg");
    }

    const collapseElements = document.querySelectorAll('.collapse') as NodeListOf<HTMLDivElement>;
    const collapseElementsArray = Array.from(collapseElements);

    for (const collapseElement of collapseElementsArray) {
      collapseElement.classList.remove('show');
    }
  }

  toggleDropdown(){
    // @ts-ignore
    const sidebar = document.querySelector(".sidebar-wrapper");
    // @ts-ignore
    if (sidebar.classList.contains("collapsed")){
      // @ts-ignore
      sidebar.classList.remove("collapsed");
    }

  }

  logout() {
    this.keycloak.logout(window.location.origin);

  }
}
