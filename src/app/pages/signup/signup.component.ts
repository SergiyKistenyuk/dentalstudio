import {Component, OnInit} from '@angular/core';

import {User} from '../../models/user.model';
import {FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;

  constructor(private usersService: UsersService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignup() {
    this.authService.signup(<User>this.signupFormGroup.value)
      .then((user: User) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSignupFormGroupReady(signupFormGroup: FormGroup) {
    this.signupFormGroup = signupFormGroup;
  }
}
