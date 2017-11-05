import { Component } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    constructor() { }

    login() {
        window.location.href = environment.apiRoot + '/auth/google';
    }

    signup() {
        window.location.href = environment.apiRoot + '/signup/google';
    }
}
