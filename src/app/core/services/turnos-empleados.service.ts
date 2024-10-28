import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnoEmpleado } from '../../models/turno-empleado.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosEmpleadosService {
  private apiUrl = 'http://localhost:3000/turnos_empleados';  // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  getTurnosEmpleados(): Observable<TurnoEmpleado[]> {
    return this.http.get<TurnoEmpleado[]>(this.apiUrl);
  }

  getTurnoEmpleadoById(id: number): Observable<TurnoEmpleado> {
    return this.http.get<TurnoEmpleado>(`${this.apiUrl}/${id}`);
  }

  addTurnoEmpleado(turno: TurnoEmpleado): Observable<TurnoEmpleado> {
    return this.http.post<TurnoEmpleado>(this.apiUrl, turno);
  }

  updateTurnoEmpleado(id: number, turno: TurnoEmpleado): Observable<TurnoEmpleado> {
    return this.http.put<TurnoEmpleado>(`${this.apiUrl}/${id}`, turno);
  }

  deleteTurnoEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
