import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {TokenStorageService} from "./token-storage.service";

export const authGuard: CanActivateFn = async (route, state) => {

  const keycloak = inject(KeycloakService);
  const TokenStorage = inject(TokenStorageService);
  if (keycloak.isLoggedIn()) {
    TokenStorage.setBearerToken(await keycloak.getToken());
    return true; // Der Benutzer ist bereits angemeldet
  } else {
    // Der Benutzer ist nicht angemeldet, leite ihn zu Keycloak weiter
    keycloak.login({redirectUri: window.location.origin});
    return false;
  }
};
