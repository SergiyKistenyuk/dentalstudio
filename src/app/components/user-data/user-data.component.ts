import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Dentist} from '../../models/dentist.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Roles} from '../../models/roles.model';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input() user: User;

  @Output() userDataFormReady = new EventEmitter<FormGroup>();

  hidePassword = true;
  userRoles = [Roles.PATIENT, Roles.DENTIST, Roles.NURSE, Roles.ADMIN];
  readonly Roles = Roles;
  userDataFormGroup: FormGroup;
  dentists: Dentist[];

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService) {
    this.userDataFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      dentist: [''],
      workExperience: [''],
      awards: [''],
      skills: [''],
      birthDate: ['']
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.usersService.getItems()
        .then((users: User[]) => {
          this.dentists = users.filter((user: User) => {
            return user.role === this.Roles.DENTIST;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 0);

    if (this.user) {
      this.userDataFormGroup.controls['firstName'].setValue(this.user.firstName);
      this.userDataFormGroup.controls['firstName'].updateValueAndValidity();
      this.userDataFormGroup.controls['lastName'].setValue(this.user.lastName);
      this.userDataFormGroup.controls['email'].setValue(this.user.email);
      this.userDataFormGroup.controls['phone'].setValue(this.user.phone);
      this.userDataFormGroup.controls['password'].setValue(this.user.password);
      this.userDataFormGroup.controls['role'].setValue(this.user.role);
      this.userDataFormGroup.controls['dentist'].setValue(this.user.currentDentistId);
      this.userDataFormGroup.controls['workExperience'].setValue(this.user.workExperience);
      this.userDataFormGroup.controls['awards'].setValue(this.user.awards);
      this.userDataFormGroup.controls['skills'].setValue(this.user.skills);
      this.userDataFormGroup.controls['birthDate'].setValue(this.user.birthDay);
      this.userDataFormGroup.controls['lastName'].setValue(this.user.lastName);
    }

    this.userDataFormReady.next(this.userDataFormGroup);
  }
}
