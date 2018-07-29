import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignupComponent} from '../auth/signup/signup.component';
import {AuthRoutingModule} from '../auth/auth-routing.module';
import {LoginComponent} from '../auth/login/login.component';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
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
