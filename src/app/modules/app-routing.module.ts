import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {HomeComponent} from '../pages/home/home.component';
import {PageNotFoundComponent} from '../pages/page-not-found/page-not-found.component';
import {UserProfileComponent} from '../pages/user-profile/user-profile.component';

const appRoutes: Routes = [
  { path: '',  component: HomeComponent, pathMatch: 'full'},
  { path: 'profile',  component: UserProfileComponent, pathMatch: 'full'}/*,
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
