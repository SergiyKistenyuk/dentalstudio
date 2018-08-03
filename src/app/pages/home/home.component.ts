import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user.model';
import {Roles} from '../../models/roles.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  readonly Roles = Roles;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.currentUser = this.localStorageService.get('currentUser');
  }

  onUserLoggedOut() {
    this.currentUser = null;
  }
}
