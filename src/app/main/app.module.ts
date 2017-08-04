import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { AudioPlayer } from './audio-player/audio-player.component';

import { PresetService } from './preset/preset.service';
import { CustomAuthService } from './user/auth.service';
import { AuthGuard } from './user/auth-guard.service';
import { AudioService } from './audio-player/audio.service';
import { AudioFileService } from './audio-player/audio-file.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FileUploadModule } from 'ng2-file-upload';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { AuthHttp } from './auth-http/auth-http';
import { AwsService } from './aws/aws.service';
import { SearchField } from './search-field/search-field.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    Ng2Bs3ModalModule,
    FileUploadModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
    AudioPlayer,
    SearchField
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new AuthHttp(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    PresetService,
    CustomAuthService,
    AuthGuard,
    AudioService,
    AudioFileService,
    AwsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
