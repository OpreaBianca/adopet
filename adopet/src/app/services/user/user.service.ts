import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.apiPath}/user`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${environment.apiPath}/user/${userId}`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  updateUserProfileImage(formData: FormData) {
    return this.http.put(`${environment.apiPath}/user`, formData).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
