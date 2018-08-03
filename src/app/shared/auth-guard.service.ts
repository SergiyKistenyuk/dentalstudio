import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {LocalStorageService} from '../services/local-storage.service';
import {Roles} from '../models/roles.model';

@Injectable()
export class DentistAuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = <User>this.localStorageService.get('currentUser');
    return user.role === Roles.DENTIST;
  }
}
