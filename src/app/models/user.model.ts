import {Roles} from './roles.model';

export class User {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phone: string = '',
    public password: string = '',
    public role: Roles = null,
    public currentDentistId: string = '',
    public finishedVisits: number[] = [],
    public upcomingVisits: number[] = [],
    public patientsIdList: string[] = [],
    public workExperience: number = null,
    public awards: string = '',
    public skills: string = '',
    public birthDay: Date = null,
    public id: number = null
  ) {}
}


