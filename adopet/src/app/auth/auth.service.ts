import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../models/user.interface';
import { UserCredentials } from '../models/user-credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private _jwtHelper: JwtHelperService,
    private _router: Router) { }

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

  logout() {
    localStorage.clear();
    this._router.navigate(['']);
  }

  getUser(): User {
    const token = this._jwtHelper.tokenGetter();
    if (token) {
      return this._jwtHelper.decodeToken(token).user;
    }
  }

  authenticateUser(token) {
    localStorage.setItem('token', token);
    this._router.navigate(['profile']);
  }

  isAuthenticated(): boolean {
    const token = this._jwtHelper.tokenGetter();
    return !this._jwtHelper.isTokenExpired(token);
  }
}
