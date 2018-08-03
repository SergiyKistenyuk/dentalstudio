import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileFormGroup: FormGroup;
  user: User;

  constructor(private usersService: UsersService,
              private localStorageService: LocalStorageService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.user = this.localStorageService.get('currentUser');
  }

  onSave() {
    const newUser = <User>Object.assign({}, this.userProfileFormGroup.value, {id: this.user.id});
    this.usersService.updateObject(newUser)
      .then((user: User) => {
        if (user.id) {
          this.snackBar.open('User data was successfully updated!', '', {duration: 2000});
          this.localStorageService.removeItem('currentUser');
          this.localStorageService.set('currentUser', user);
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
