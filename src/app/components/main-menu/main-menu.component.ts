import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Roles} from '../../models/roles.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @Input() currentUser: User;

  readonly Roles = Roles;

  constructor() { }

  ngOnInit() {
  }

}
