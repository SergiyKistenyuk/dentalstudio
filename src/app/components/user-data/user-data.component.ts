import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Dentist} from '../../models/dentist.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Roles} from '../../models/roles.model';
import {PatientService} from '../../services/patient.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Output() userDataFormReady = new EventEmitter<FormGroup>();

  hidePassword = true;
  userRoles = [Roles.PATIENT, Roles.DENTIST, Roles.NURSE, Roles.ADMIN];
  readonly Roles = Roles;
  userDataFormGroup: FormGroup;
  dentists: Dentist[];

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService) {
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
      this.patientService.getItems()
        .then((users: User[]) => {
          this.dentists = users.filter((user: User) => {
            return user.role === this.Roles.DENTIST;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 0);

    this.userDataFormReady.next(this.userDataFormGroup);
  }
}
