import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input() currentUser: User;

  @Output() userLoggedOut = new EventEmitter<any>();

  constructor(private localStorageService: LocalStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.logout();
    this.userLoggedOut.next();
    this.router.navigate(['/']);
  }
}
