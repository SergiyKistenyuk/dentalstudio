import {Component, OnDestroy, OnInit} from '@angular/core';

import {User} from '../../models/user.model';
import {Roles} from '../../models/roles.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PatientService} from '../../services/patient.service';
import {Patient} from '../../models/patient.model';
import {DentistService} from '../../services/dentist.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  user = new User();
  // user: User = {role: Roles.PATIENT};
  // user: User = {role: Roles.DENTIST};
  hidePassword = true;
  userRoles = [Roles.PATIENT, Roles.DENTIST, Roles.NURSE, Roles.ADMIN];
  readonly Roles = Roles;
  signupFormGroup: FormGroup;
  subscriptions: Subscription[] = [];
  birthDate: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              public dentistService: DentistService,
              public snackBar: MatSnackBar) {
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
      skillsCtrl: [''],
      birthDateCtrl: ['']
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
    this.patientService.addObject(<User>this.user)
      .then((item) => {
        debugger;
        this.snackBar.open('User data was saved!', '', {duration: 2000,});

      })
      .catch((error) => {
        debugger;
      });
  }

  onSaveMockUsers() {
    this.dentistService.addCollection(this.patientService.mockPatients.concat(this.dentistService.mockDentists))
      .then((items) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });

    this.dentistService.addCollection(this.patientService.mockPatients.concat(this.dentistService.mockDentists))
      .then((items) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }

  onGetUser() {
    this.patientService.getObject((<User>this.user).id)
      .then((item) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }

  onGetUsers() {
    this.patientService.getItems()
      .then((items) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }


  onUpdateUser() {
    this.patientService.updateObject(<Patient>this.user)
      .then((item) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
