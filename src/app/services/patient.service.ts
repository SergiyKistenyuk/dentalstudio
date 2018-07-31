import { Injectable } from '@angular/core';

import {Patient} from '../models/patient.model';
import {BaseDataService} from './base.service';
import {IndexedDbService} from './indexed-DB.service';
import {Roles} from '../models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseDataService<Patient> {

  mockPatients = [
    new Patient(Roles.PATIENT, '1', [5], [1], 'Ivan', 'Green', 'ivan@gmail.com', '+380673620101', '123456'),
    new Patient(Roles.PATIENT, '2', [7], [2], 'Peter', 'Laurence', 'peter@gmail.com', '+380673620102', '123457')
  ];

  constructor(protected dataProviderService: IndexedDbService) {
    super('dentists', dataProviderService);
  }
}
