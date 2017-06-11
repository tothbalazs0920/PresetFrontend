import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) {
  }

  login() {
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('token');
    this.router.navigateByUrl('/presets');
  }

  loggedIn() {
    // name of the key in local storage
    return tokenNotExpired('token');
  }
}
