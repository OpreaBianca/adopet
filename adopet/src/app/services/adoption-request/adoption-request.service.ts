import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AdoptionRequest } from '../../models/adoption-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  constructor(private http: HttpClient) { }

  createRequest(request: AdoptionRequest): Observable<any> {
    return this.http.post(`${environment.apiPath}/adoption-request`, request).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
