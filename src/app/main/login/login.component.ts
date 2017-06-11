import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'my-app',
    template: `<h1>Angular2 Social login</h1>{{status}}
              
              <button (click)="login()">linkedIn</button>
              <button (click)="ping()">facebook</button>
             
              <a href="http://localhost:3001/auth/google">google</a>
              <div *ngIf="user">
                <table>
                  <tr>
                    <td>Name:</td>
                    <td>{{user.name}}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{user.email}}</td>
                  </tr>
                  <tr>
                    <td>UID</td>
                    <td>{{user.uid}}</td>
                  </tr>
                  <tr>
                    <td>Provider</td>
                    <td>{{user.provider}}</td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>{{user.image}}</td>
                  </tr>
                </table>
              </div>
              `
})
export class LoginComponent implements OnDestroy {
    public user;
    sub: any;
    constructor( private http: Http) { }

    login() {
        return this.http
            .get('http://localhost:3001/auth/google')
            .toPromise()
            .then(response => response.json())
            .catch((err) => console.log(err));
    }

    ping() {
        return this.http
            .get('http://localhost:3001/ping')
            .toPromise()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}