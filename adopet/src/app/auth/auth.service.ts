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
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  signUp(user: User): Observable<any> {
    // return this.http.post(`auth/sign-up`, user).pipe(
    return this.http.post(`${environment.apiPath}/auth/sign-up`, user).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  login(userCredentials: UserCredentials): Observable<any> {
    // return this.http.post(`auth/login`, userCredentials).pipe(
    return this.http.post(`${environment.apiPath}/auth/login`, userCredentials).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getUser(): User {
    const token = this.jwtHelper.tokenGetter();
    if (token) {
      return this.jwtHelper.decodeToken(token).user;
    }
  }

  authenticateUser(token) {
    localStorage.setItem('token', token);
    this.router.navigate(['profile']);
  }

  isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    return !this.jwtHelper.isTokenExpired(token);
  }
}
