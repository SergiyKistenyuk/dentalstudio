import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignupComponent} from '../pages/signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from '../pages/login/login.component';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {CustomDatePipe} from '../shared/custom-date.pipe';
import {UserDataComponent} from '../components/user-data/user-data.component';
import {AuthService} from '../services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    CustomDatePipe,
    UserDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule
  ],
  exports: [
    UserDataComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
