import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService
  ]
};

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return () =>
    keycloak.init({
      config: {
        url: ' https://keycloak.szut.dev/auth',
        realm: 'szut',
        clientId: 'employee-management-service-frontend',
      },
      initOptions: {
        onLoad: 'check-sso', //login-required auch möglich, führt zum Login-Zwang beim Aufruf der Startseite
        checkLoginIframe: true,
        checkLoginIframeInterval: 25
      },
      enableBearerInterceptor: true,
    });
}


