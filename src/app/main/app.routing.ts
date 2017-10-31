import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './user/auth-guard.service';

import { PublicPresetListComponent } from './preset-list/public-preset-list.component';
import { PrivatePresetListComponent } from './preset-list/private-preset-list.component';
import { DownloadedPresetListComponent } from './preset-list/downloaded-preset-list.component';
import { UploadComponent } from './upload/upload.component';
import { PresetComponent } from './preset/preset.component';
import { SellComponent } from './sell/sell.component';
import { ContactComponent } from './contact/contact.component';
import { TermsComponent } from './terms/terms.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/presets',
    pathMatch: 'full'
  },
  {
    path: 'presets',
    component: PublicPresetListComponent
  },
  {
    path: 'preset/:id',
    component: PresetComponent
  },
  {
    path: 'uploadedpresets',
    component: PrivatePresetListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'downloadedpresets',
    component: DownloadedPresetListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: UploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sell',
    component: SellComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [PublicPresetListComponent, PrivatePresetListComponent, 
  DownloadedPresetListComponent, UploadComponent, PresetComponent, SellComponent, ContactComponent, TermsComponent];
