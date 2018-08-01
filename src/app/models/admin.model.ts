import {Roles} from './roles.model';
import {User} from './user.model';

export class Admin extends User {
  constructor(
    public role: Roles = Roles.ADMIN,
    public email: string = '',
    public password: string = '',
    public id: number = null
  ) {
    super();
  }
}
