import { Injectable } from '@angular/core';
import {UsersService} from './users.service';
import {User} from '../models/user.model';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private localStorageService: LocalStorageService) { }

  login(userData: {email: string, password: string}) {
    return new Promise((resolve, reject) => {
      this.usersService.getObjectByParam('email', userData.email)
        .then((user: User) => {
          if (user && user.password === userData.password) {
            this.localStorageService.set('currentUser', user);
            resolve(user);
          } else {
            reject('Incorrect email or password.');
          }
        })
        .catch((error) => reject('Incorrect email or password.'));
    });
  }

  signup(user: User) {
    return new Promise((resolve, reject) => {
      this.usersService.addObject(user)
        .then((savedUser: User) => {
          if (user.id) {
            // this.snackBar.open('User data was successfully saved!', '', {duration: 2000});
            this.localStorageService.set('currentUser', savedUser);
            // this.router.navigate(['/']);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  logout() {
    this.localStorageService.removeItem('currentUser');
  }
}
