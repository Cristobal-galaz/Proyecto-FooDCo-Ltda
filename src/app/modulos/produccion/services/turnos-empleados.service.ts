import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TurnoEmpleado } from '../interfaces/turno-empleado.model';

@Injectable({
  providedIn: 'root',
})
export class TurnosEmpleadosService {
  private apiUrl = `${environment.apiUrl}turnos-empleados`;

  constructor(private http: HttpClient) {}

  getTurnosEmpleados(): Observable<TurnoEmpleado[]> {
    return this.http.get<TurnoEmpleado[]>(`${this.apiUrl}/list`);
  }

  getTurnoEmpleadoById(id: string): Observable<TurnoEmpleado> {
    return this.http.get<TurnoEmpleado>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el turno por ID:', error);
        return throwError(() => new Error('Error al obtener el turno'));
      })
    );
  }  


  addTurnoEmpleado(turno: TurnoEmpleado): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, turno).pipe(
      catchError((error) => {
        console.error('Error al crear turno:', error);
        return throwError(() => new Error('Error al crear turno'));
      })
    );
  }

  updateTurnoEmpleado(id: string, turno: Partial<TurnoEmpleado>): Observable<TurnoEmpleado> {
    return this.http.put<TurnoEmpleado>(`${this.apiUrl}/update/${id}`, turno).pipe(
      catchError((error) => {
        console.error('Error al actualizar el turno:', error);
        return throwError(() => new Error('Error al actualizar el turno'));
      })
    );
  }  

  deleteTurnoEmpleado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
