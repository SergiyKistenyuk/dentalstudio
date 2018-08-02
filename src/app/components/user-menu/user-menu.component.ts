import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input() currentUser: User;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogOut() {
    this.localStorageService.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
