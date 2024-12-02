import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MateriaPrima } from '../interfaces/materia-prima.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasPrimasService {
  private apiUrl = `${environment.apiUrl}materia-prima`;

  constructor(private http: HttpClient) {}

  getMateriasPrimas(): Observable<MateriaPrima[]> {
    return this.http.get<MateriaPrima[]>(`${this.apiUrl}/list`);
  }

  getMateriaPrimaById(id: string): Observable<MateriaPrima> {
    return this.http.get<MateriaPrima>(`${this.apiUrl}/${id}`);
  }
  
  descontarMateriaPrima(id: string, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/inventario/descontar`, { id, cantidad });
  }

  addMateriaPrima(materiaPrima: MateriaPrima): Observable<MateriaPrima> {
    return this.http.post<MateriaPrima>(this.apiUrl, materiaPrima);
  }

  updateMateriaPrima(id: string, materiaPrima: Partial<MateriaPrima>): Observable<MateriaPrima> {
    return this.http.put<MateriaPrima>(`${this.apiUrl}/update/${id}`, materiaPrima);
  }

  deleteMateriaPrima(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
