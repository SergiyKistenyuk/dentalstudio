import { Injectable } from '@angular/core';

import {BaseDataService} from './base.service';
import {IndexedDbService} from './indexed-DB.service';
import {Admin} from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseDataService<Admin> {
  constructor(protected dataProviderService: IndexedDbService) {
    super('users', dataProviderService);
  }
}
