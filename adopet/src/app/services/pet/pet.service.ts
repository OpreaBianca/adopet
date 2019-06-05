import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Pet } from '../../models/pet.interface';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) { }

  getPetsByOwner(): Observable<any> {
    return this.http.get(`${environment.apiPath}/pet`).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  addPet(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiPath}/pet`, formData).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  updatePet(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiPath}/pet`, formData).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  updatePetFavorites(pet: Pet): Observable<any> {
    return this.http.put(`${environment.apiPath}/pet/favorites`, pet).pipe(
      catchError((err) => observableThrowError(err))
    );
  }

  removePet(pet: Pet): Observable<any> {
    return this.http.delete(`${environment.apiPath}/pet`, {
      params: new HttpParams().set('pet', JSON.stringify(pet)),
    }).pipe(
      catchError((err) => observableThrowError(err))
    );
  }
}
