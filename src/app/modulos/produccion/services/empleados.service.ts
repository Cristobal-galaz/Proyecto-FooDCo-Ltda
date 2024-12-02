import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = `${environment.apiUrl}empleado`;

  constructor(private http: HttpClient) {}

  getEmpleados(filtro: { departamento?: string; role?: string } = {}): Observable<any> {
    const queryParams = new URLSearchParams(filtro as any).toString();
    const url = queryParams ? `${this.apiUrl}/list?${queryParams}` : `${this.apiUrl}/list`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener empleados:', error);
        return throwError(() => new Error('Error al cargar empleados'));
      })
    );
  }
}
