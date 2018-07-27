import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {LoginComponent} from './pages/authentication/login/login.component';

const appRoutes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
