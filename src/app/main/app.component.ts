import { Component, ViewChild } from '@angular/core';
import { AuthService } from './user/auth.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'presets',
  templateUrl: 'app.html',
  styles: ['.navbar-right { margin-right: 0px !important}']
})
export class AppComponent {
  title = 'Presets';

  constructor(private authService: AuthService) { }

  redirect() {
    window.location.href = environment.apiRoot + '/auth/google';
  }
}
