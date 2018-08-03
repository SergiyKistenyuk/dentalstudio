import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AuthMenuComponent} from './components/auth-menu/auth-menu.component';
import {MaterialModule} from './modules/material.module';
import {AppRoutingModule} from './modules/app-routing.module';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AuthModule} from './modules/auth.module';
import {IndexedDbService} from './services/indexed-DB.service';
import {LocalStorageService} from './services/local-storage.service';
import {UserDataComponent} from './components/user-data/user-data.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {ApiService} from './services/api.service';
import {UsersService} from './services/users.service';
import { VisitAdministrationComponent } from './pages/visit-administration/visit-administration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthMenuComponent,
    MainMenuComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    UserMenuComponent,
    VisitAdministrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule
  ],
  exports: [
    UserDataComponent
  ],
  providers: [
    IndexedDbService,
    UsersService,
    LocalStorageService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
