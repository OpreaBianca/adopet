import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private _http: HttpClient) { }

  getImageByName(imageName: string, userId: string): Observable<any> {
    let params = new HttpParams().set('imageName', imageName);
    params = params.set('userId', userId);

    return this._http.get(`${environment.apiPath}/image`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: params,
      responseType: 'blob'
    }).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
