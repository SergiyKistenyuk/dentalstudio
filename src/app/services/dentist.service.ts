import { Injectable } from '@angular/core';

import {BaseDataService} from './base.service';
import {IndexedDbService} from './indexed-DB.service';
import {Dentist} from '../models/dentist.model';
import {Roles} from '../models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class DentistService extends BaseDataService<Dentist> {

  mockDentists = [
    new Dentist(Roles.PATIENT, ['1'], 5, 'The best Dentist', 'Therapist', [1], 'John', 'Dou', 'john@gmail.com', '+380673620001', '123456'),
    new Dentist(Roles.PATIENT, ['2'], 10, 'The best Orthopaedist', 'Orthopaedist', [2], 'Steward', 'Mayer', 'steward@gmail.com', '+380673620002', '123456')
  ];

  constructor(protected dataProviderService: IndexedDbService) {
    super('users', dataProviderService);
  }
}
