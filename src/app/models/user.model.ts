import {Roles} from './roles.model';

export class User {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phone: string = '',
    public password: string = '',
    public role: Roles = null,
    public id: string = ''
  ) {}
}
