import {Component, OnDestroy, OnInit} from '@angular/core';

import {User} from '../../models/user.model';
import {Roles} from '../../models/roles.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DBService} from '../../services/DB.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  user = new User;
  hidePassword = true;
  Roles = [Roles.PATIENT, Roles.DENTIST, Roles.NURSE, Roles.ADMIN];
  signupFormGroup: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private DBService: DBService) {
    this.signupFormGroup = this.formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      roleCtrl: ['', Validators.required],
      dentistCtrl: [''],
      workExperienceCtrl: [''],
      awardsCtrl: [''],
      skillsCtrl: ['']
    });
  }

  ngOnInit() {
    // const roleCtrl = this.signupFormGroup.controls['roleCtrl'];
    // const roleCtrlChanges$ = roleCtrl.valueChanges;
    //
    // this.subscriptions.push(roleCtrlChanges$.subscribe((role: Roles) => {
    // }));
  }

  onSignup() {
    debugger;
    this.subscriptions.push(this.DBService.add(this.user)
      .subscribe((user: User) => {
        debugger;
      }));
  }

  onGetUser() {
    this.subscriptions.push(this.DBService.get(this.user.role, '1')
      .subscribe((user: User) => {
        debugger;
      }));
  }

  onGetUsers() {
    this.subscriptions.push(this.DBService.getAll(this.user.role)
      .subscribe((users: User[]) => {
        debugger;
      }));
  }


  onUpdateUser() {
    this.subscriptions.push(this.DBService.update(this.user.role, '1')
      .subscribe((user: User) => {
        debugger;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
