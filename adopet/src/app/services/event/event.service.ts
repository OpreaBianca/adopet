import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Event } from '../../models/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${environment.apiPath}/event/all`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  getEventsByCreator(): Observable<any> {
    return this.http.get(`${environment.apiPath}/event`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  addEvent(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiPath}/event`, formData).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  removeEvent(event: Event): Observable<any> {
    return this.http.delete(`${environment.apiPath}/event`, {
      params: new HttpParams().set('event', JSON.stringify(event)),
    }).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
