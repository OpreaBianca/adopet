import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LocalAdoptionRequest } from '../../models/local-adoption-request.interface';
import { AdoptionRequest } from '../../models/adoption-request.interface';
import { Message } from '../../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  constructor(private http: HttpClient) { }

  getReceivedRequests(): Observable<any> {
    return this.http.get(`${environment.apiPath}/adoption-request/received`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  getSentRequests(): Observable<any> {
    return this.http.get(`${environment.apiPath}/adoption-request/sent`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  createRequest(request: LocalAdoptionRequest): Observable<any> {
    return this.http.post(`${environment.apiPath}/adoption-request`, request).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  updateRequestStatus(request: AdoptionRequest): Observable<any> {
    return this.http.put(`${environment.apiPath}/adoption-request`, request).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  addRequestMessage(message: Message, id: string): Observable<any> {
    return this.http.put(`${environment.apiPath}/adoption-request/${id}`, message).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
