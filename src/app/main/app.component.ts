import { Component, ViewChild } from '@angular/core';
import { CustomAuthService } from './user/auth.service';
import { environment } from './../../environments/environment';
import { SearchField } from './search-field/search-field.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'presets',
  templateUrl: 'app.html',
  styleUrls: ['app.css']
})
export class AppComponent {

  @ViewChild('loginModal')
  modal: ModalComponent;

  constructor(private CustomAuthService: CustomAuthService) { }

  login() {
    window.location.href = environment.apiRoot + '/auth/google';
  }

  signup() {
    window.location.href = environment.apiRoot + '/signup/google';
  }
}
