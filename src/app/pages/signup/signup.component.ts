import {Component, OnInit} from '@angular/core';

import {User} from '../../models/user.model';
import {FormGroup} from '@angular/forms';
import {DentistService} from '../../services/dentist.service';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;

  constructor(private patientService: DentistService,
              private localStorageService: LocalStorageService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSignup() {
    this.patientService.addObject(<User>this.signupFormGroup.value)
      .then((user: User) => {
        if (user.id) {
          this.snackBar.open('User data was successfully saved!', '', {duration: 2000});
          this.localStorageService.set('currentUser', user);
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSignupFormGroupReady(signupFormGroup: FormGroup) {
    this.signupFormGroup = signupFormGroup;
  }
}
