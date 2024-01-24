import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "keycloak-angular";

export const authGuard: CanActivateFn = (route, state) => {

  const keycloak = inject(KeycloakService);
  return new Promise(async (resolve, reject) => {
    if (!keycloak.isLoggedIn()) {
      await keycloak.login();
      resolve(false); // Der Benutzer ist bereits angemeldet
    }
    resolve(true);
  })

};
