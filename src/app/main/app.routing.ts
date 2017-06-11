import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './user/auth-guard.service';

import { PublicPresetListComponent } from './preset-list/public-preset-list.component';
import { PrivatePresetListComponent } from './preset-list/private-preset-list.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';

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
    path: 'profile',
    component: PrivatePresetListComponent,
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
    path: 'login',
    component: LoginComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [PublicPresetListComponent, PrivatePresetListComponent, UploadComponent, LoginComponent];