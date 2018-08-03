import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  public getMockUsers(): Observable<User[] | {}> {
    return this.http.get<User[]>('http://localhost:8000/assets/mock-users.json')
      .pipe(
        map((users: User[]) => {
          return users;
        }),
        catchError(e => throwError(e))
      );
  }
}
