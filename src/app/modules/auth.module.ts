import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignupComponent} from '../auth/signup/signup.component';
import {AuthRoutingModule} from '../auth/auth-routing.module';
import {LoginComponent} from '../auth/login/login.component';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {CustomDatePipe} from '../shared/custom-date.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule {}
