import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {HomeComponent} from '../pages/home/home.component';
import {UserProfileComponent} from '../pages/user-profile/user-profile.component';
import {VisitAdministrationComponent} from '../pages/visit-administration/visit-administration.component';
import {DentistAuthGuard} from '../shared/auth-guard.service';

const appRoutes: Routes = [
  { path: '',  component: HomeComponent, pathMatch: 'full'},
  { path: 'profile',  component: UserProfileComponent, pathMatch: 'full'},
  { path: 'visitadmin', component: VisitAdministrationComponent, canActivate: [DentistAuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
