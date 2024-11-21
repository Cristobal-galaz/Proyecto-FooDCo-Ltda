// control-calidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlCalidadService {
  private apiUrl = `${environment.apiUrl}/api/v1/control-calidad`;

  constructor(private http: HttpClient) {}

  getRegistros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resultados`);
  }

  addRegistro(controlData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/revision`, controlData);
  }
}