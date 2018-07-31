import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {MaterialModule} from './modules/material.module';
import {AppRoutingModule} from './modules/app-routing.module';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AuthModule} from './modules/auth.module';
import {IndexedDbService} from './services/indexed-DB.service';
import {PatientService} from './services/patient.service';
import {DentistService} from './services/dentist.service';
import {NurseService} from './services/nurse.service';
import {AdminService} from './services/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainMenuComponent,
    UserProfileComponent,
    PageNotFoundComponent
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
  providers: [
    IndexedDbService,
    PatientService,
    DentistService,
    NurseService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
