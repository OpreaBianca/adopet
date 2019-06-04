import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private _http: HttpClient) { }

  getPetsByOwner(): Observable<any> {
    return this._http.get(`${environment.apiPath}/pet`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  addPet(formData: FormData): Observable<any> {
    return this._http.post(`${environment.apiPath}/pet`, formData).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
