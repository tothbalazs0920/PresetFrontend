import { Injectable, OnInit } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class CustomAuthService implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
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

  getEmail() {
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    let user = jwtHelper.decodeToken(token);
    if(user) {
      return user.email;
    }
  }
  
}
