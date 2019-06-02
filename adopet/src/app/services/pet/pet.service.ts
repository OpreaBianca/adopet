import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private _http: HttpClient) { }

  addPet(formData: FormData): Observable<any> {
    return this._http.post(`${environment.apiPath}/pet`, formData).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
