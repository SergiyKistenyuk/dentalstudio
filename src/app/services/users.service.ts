import { Injectable } from '@angular/core';

import {BaseDataService} from './base.service';
import {IndexedDbService} from './indexed-DB.service';
import {User} from '../models/user.model';

@Injectable()
export class UsersService extends BaseDataService<User> {
  constructor(protected dataProviderService: IndexedDbService) {
    super('users', dataProviderService);
  }
}

