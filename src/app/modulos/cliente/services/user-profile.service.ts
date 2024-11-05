import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Profile, Empresa, Contacto, Verification } from '../interfaces/profile';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl = environment.apiUrl;
  private verificacionSubject = new BehaviorSubject<boolean>(false);
  verificacion$ = this.verificacionSubject.asObservable();

  constructor(private http: HttpClient) { }

  verificationProfile(verification: Verification): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}cliente/verify`, verification);
}

  getProfileCompany(idUser: string | null): Observable<Empresa | null> {
    if (!idUser) {
      return of(null); // Devuelve un Observable que emite null si no hay idUser
    }
    return this.http.get<Profile>(`${this.apiUrl}cliente/view/${idUser}`).pipe(
      map((response: Profile) => response.empresa || null) // Extrae solo la propiedad empresa
    );
  }
  getProfileContact(idUser: string | null): Observable<Contacto | null> {
    if (!idUser) {
      return of(null); // Devuelve un Observable que emite null si no hay idUser
    }
    return this.http.get<Profile>(`${this.apiUrl}cliente/view/${idUser}`).pipe(
      map((response: Profile) => response.contacto || null) // Extrae solo la propiedad empresa
    );
  }

  putProfileCompany(idUser: string | null, empresa: Empresa): Observable<Profile | null> {
    if (!idUser) {
      console.error('ID de usuario inválido');
      return of(null); // Maneja el caso cuando idUser es null
    }

    return this.http.put<Profile>(`${this.apiUrl}cliente/update/${idUser}`, { empresa }).pipe(
      catchError(error => {
        console.error('Error al actualizar el perfil de la empresa:', error);
        return of(null); // Devuelve null en caso de error para evitar fallos en el flujo
      })
    );
  }
  putProfileContact(idUser: string | null, contacto: Contacto): Observable<Profile | null> {
    if (!idUser) {
      console.error('ID de usuario inválido');
      return of(null); // Maneja el caso cuando idUser es null
    }

    return this.http.put<Profile>(`${this.apiUrl}cliente/update/${idUser}`, { contacto }).pipe(
      catchError(error => {
        console.error('Error al actualizar el perfil de la contacto:', error);
        return of(null); // Devuelve null en caso de error para evitar fallos en el flujo
      })
    );
  }
  updateVerification() {
    const newValue = !this.verificacionSubject.value;
    this.verificacionSubject.next(newValue);
  }
}
