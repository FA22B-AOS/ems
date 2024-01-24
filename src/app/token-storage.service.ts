import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private bearerToken: string = '';

  setBearerToken(token: string): void {
    this.bearerToken = token;
  }

  getBearerToken(): string {
    return this.bearerToken;
  }
}
