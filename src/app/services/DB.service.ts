import { Injectable } from '@angular/core';

import {User} from '../models/user.model';
import {Patient} from '../models/patient.model';
import {Roles} from '../models/roles.model';
import {Dentist} from '../models/dentist.model';
import {IDBService} from './idb.service';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  currentUser: User;
  mockData = {
    patients: [
      new Patient(Roles.PATIENT, '1', [5], [1], 'Ivan', 'Green', 'ivan@gmail.com', '+380673620101', '123456'),
      new Patient(Roles.PATIENT, '2', [7], [2], 'Peter', 'Laurence', 'peter@gmail.com', '+380673620102', '123457')
    ],
    dentists: [
      new Dentist(Roles.PATIENT, ['1'], 5, 'The best Dentist', 'Therapist', [1], 'John', 'Dou', 'john@gmail.com', '+380673620001', '123456'),
      new Dentist(Roles.PATIENT, ['2'], 10, 'The best Orthopaedist', 'Orthopaedist', [2], 'Steward', 'Mayer', 'steward@gmail.com', '+380673620002', '123456')
    ],
    nurses: [],
    admins: []
  };

  constructor(private idbService: IDBService) { }

  setDBName(dbName) {
    this.idbService.setName(dbName);
  }

  create() {
    const storesSchemaAndSeeds = [
      {
        name: 'patients',
        indexes: ['role', 'currentDentistId', 'finishedVisits', 'upcomingVisits', 'firstName', 'lastName', 'email', 'phone', 'password'],
        seeds: this.mockData.patients
      },
      {
        name: 'dentists',
        indexes: ['role', 'patientsIdList', 'workExperience', 'awards', 'skills', 'upcomingVisits', 'firstName', 'lastName', 'email', 'phone', 'password'],
        seeds: this.mockData.dentists
      },
    ];

    this.idbService.clear().subscribe(done => {

      this.idbService.create(storesSchemaAndSeeds).subscribe((create) => {

        // // List all users.
        // this.idbService.all('users').subscribe(users => this.allUsers = users);
        //
        // // List all orders.
        // this.idbService.all('orders').subscribe(orders => this.allOrdersBeforeUpdate = orders);
        //
        // // Post new order and update the orders all orders.
        // let newOrder = { name: "Phone S999", price: 910.00, user: "John" };
        // this.idbService
        //   .post('orders', newOrder)
        //   .subscribe((res: any) => {
        //     this.postPerformed = true;
        //     this.idbService.all('orders').subscribe(orders => this.allOrdersAfterUpdate = orders);
        //   });
      });
    });
  }

  getAll(role: string) {
    return this.idbService.all(role);
  }

  get(role: string, id: string) {
    return this.idbService.get(role, id);
  }

  add(user: User) {
    return this.idbService.post(user.role, user);
  }

  update(role: string, id: string) {
    return this.idbService.put(role, id);
  }

  delete(role: string, id: string) {
    return this.idbService.remove(role, id);
  }

  count(role: string) {
    return this.idbService.count(role);
  }
}
