import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              public snackBar: MatSnackBar) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginFormGroup.value)
      .then((user: User) => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.loginFormGroup.controls.email.setErrors({'incorrect': true});
        this.loginFormGroup.controls.password.setErrors({'incorrect': true});
        this.snackBar.open(error, '', {duration: 2000});
        console.log(error);
      });
  }
}
