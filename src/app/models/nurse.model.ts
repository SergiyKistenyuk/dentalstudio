import {Roles} from './roles.model';
import {User} from './user.model';

export class Nurse extends User {
  constructor(
    public role: Roles = Roles.NURSE,
    public workExperience: number,
    public awards: string,
    public skills: string,
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phone: string = '',
    public password: string = '',
    public id: string = '') {
    super();
  }
}
