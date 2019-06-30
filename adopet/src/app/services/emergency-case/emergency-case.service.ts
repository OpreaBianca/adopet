import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { EmergencyCase } from '../../models/emergency-case.interface';

@Injectable({
  providedIn: 'root'
})
export class EmergencyCaseService {
  constructor(private http: HttpClient) { }

  getAllEmergencyRequests(): Observable<any> {
    return this.http.get(`${environment.apiPath}/emergency-case/all`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  getEmergencyRequestsByTakenOver(): Observable<any> {
    return this.http.get(`${environment.apiPath}/emergency-case`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  createEmergencyRequest(emergency: EmergencyCase): Observable<any> {
    return this.http.post(`${environment.apiPath}/emergency-case`, emergency).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  acceptEmergencyRequest(emergency: EmergencyCase): Observable<any> {
    return this.http.put(`${environment.apiPath}/emergency-case`, emergency).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
