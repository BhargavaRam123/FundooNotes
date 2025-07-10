import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private authSecretKey = 'token';

  constructor(private router: Router) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  // Add this login method
  login(token: string): void {
    localStorage.setItem(this.authSecretKey, token);
    this.isAuthenticated = true;
  }

  isAuthenticatedUser(): boolean {
    console.log('authentication value:', this.isAuthenticated);
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
