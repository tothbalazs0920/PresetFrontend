import { Component, ViewChild } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'presets',
  templateUrl: 'app.html',
  styles: ['.navbar-right { margin-right: 0px !important}']
})
export class AppComponent {

  title = 'Presets';

  constructor(private authService: AuthService) { }
}
