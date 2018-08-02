import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {MatSnackBar} from '@angular/material';
import {DentistService} from '../../services/dentist.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileFormGroup: FormGroup;
  user: User;

  constructor(private patientService: DentistService,
              private localStorageService: LocalStorageService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.user = this.localStorageService.get('currentUser');
    debugger;
  }

  onSave() {
    debugger;
    this.patientService.updateObject(<User>this.userProfileFormGroup.value)
      .then((user: User) => {
        if (user.id) {
          this.snackBar.open('User data was successfully updated!', '', {duration: 2000});
          this.localStorageService.set('currentUser', user);
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onUserProfileFormReady(userProfileFormGroup: FormGroup) {
    this.userProfileFormGroup = userProfileFormGroup;
  }
}
