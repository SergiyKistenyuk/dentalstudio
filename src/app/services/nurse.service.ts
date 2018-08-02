import { Injectable } from '@angular/core';

import {BaseDataService} from './base.service';
import {IndexedDbService} from './indexed-DB.service';
import {Nurse} from '../models/nurse.model';

@Injectable()
export class NurseService extends BaseDataService<Nurse> {
  constructor(protected dataProviderService: IndexedDbService) {
    super('users', dataProviderService);
  }
}
