import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home']);
  }
}
