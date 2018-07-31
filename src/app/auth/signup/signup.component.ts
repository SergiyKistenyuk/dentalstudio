import {Component, OnDestroy, OnInit} from '@angular/core';

import {User} from '../../models/user.model';
import {Roles} from '../../models/roles.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PatientService} from '../../services/patient.service';
import {Patient} from '../../models/patient.model';
import {NurseService} from '../../services/nurse.service';
import {AdminService} from '../../services/admin.service';
import {BaseDataService} from '../../services/base.service';
import {IndexedDbService} from '../../services/indexed-DB.service';
import {DentistService} from '../../services/dentist.service';

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
              private patientService: PatientService) {
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
    this.patientService.addObject(<Patient>this.user)
      .then((item) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }

  onGetUser() {
    this.patientService.getObject(this.user.id)
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
