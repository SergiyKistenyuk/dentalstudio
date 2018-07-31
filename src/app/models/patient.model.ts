import {Roles} from './roles.model';
import {User} from './user.model';

export class Patient extends User {
  constructor(public role: Roles = Roles.PATIENT,
              public currentDentistId: string = '',
              public finishedVisits: number[] = [],
              public upcomingVisits: number[] = [],
              public firstName: string = '',
              public lastName: string = '',
              public email: string = '',
              public phone: string = '',
              public password: string = '',
              public birthDay: Date = null,
              public id: string = '') {
    super();
  }
}
