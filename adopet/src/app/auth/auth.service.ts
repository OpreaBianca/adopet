import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user.interface';
import { UserCredentials } from '../models/user-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post(`${environment.apiPath}/auth/sign-up`, user).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  login(userCredentials: UserCredentials): Observable<any> {
    return this.http.post(`${environment.apiPath}/auth/login`, userCredentials).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
