import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TurnoEmpleado } from '../interfaces/turno-empleado.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosEmpleadosService {
  
  private apiUrl = `${environment.apiUrl}turnos-empleados`; 

  constructor(private http: HttpClient) {}

  getTurnosEmpleados(): Observable<TurnoEmpleado[]> {
    return this.http.get<TurnoEmpleado[]>(`${this.apiUrl}/list`);
  }

  getTurnoEmpleadoById(id: string): Observable<TurnoEmpleado> {
    return this.http.get<TurnoEmpleado>(`${this.apiUrl}/${id}`);
  }

  addTurnoEmpleado(turno: TurnoEmpleado): Observable<TurnoEmpleado> {
    return this.http.post<TurnoEmpleado>(`${this.apiUrl}/asignar`, turno); 
  }

  updateTurnoEmpleado(id: string, turno: Partial<TurnoEmpleado>): Observable<TurnoEmpleado> {
    return this.http.put<TurnoEmpleado>(`${this.apiUrl}/update/${id}`, turno);
  }

  deleteTurnoEmpleado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
