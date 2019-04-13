import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${environment.apiPath}`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
