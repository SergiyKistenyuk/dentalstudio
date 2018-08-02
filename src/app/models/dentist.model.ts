import {Roles} from './roles.model';
import {User} from './user.model';

export class Dentist extends User {
  constructor(
    public role: Roles = Roles.DENTIST,
    public patientsIdList: string[] = [],
    public workExperience: number = null,
    public awards: string = '',
    public skills: string = '',
    public upcomingVisits: number[],
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phone: string = '',
    public password: string = '',
    public birthDay: Date = null,
    public id: number = null) {
    super();
  }
}
