import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MateriaPrima } from '../../models/materia-prima.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasPrimasService {
  private apiUrl = 'http://localhost:3000/materias_primas';  

  constructor(private http: HttpClient) {}

  // Obtener todas las materias primas
  getMateriasPrimas(): Observable<MateriaPrima[]> {
    return this.http.get<MateriaPrima[]>(this.apiUrl);
  }

  // Obtener una materia prima por su ID
  getMateriaPrimaById(id: number): Observable<MateriaPrima> {
    return this.http.get<MateriaPrima>(`${this.apiUrl}/${id}`);
  }

  // Añadir una nueva materia prima
  addMateriaPrima(materiaPrima: MateriaPrima): Observable<MateriaPrima> {
    return this.http.post<MateriaPrima>(this.apiUrl, materiaPrima);
  }

  // Actualizar una materia prima existente
  updateMateriaPrima(id: number, materiaPrima: MateriaPrima): Observable<MateriaPrima> {
    if (materiaPrima.cantidad < materiaPrima.stock_minimo) {
      console.warn(`Stock bajo de ${materiaPrima.nombre}: ${materiaPrima.cantidad} unidades`);
      // Aquí podemos añadir una alerta visual o lógica adicional
    }
    return this.http.put<MateriaPrima>(`${this.apiUrl}/${id}`, materiaPrima);
  }
  
  // Eliminar una materia prima
  deleteMateriaPrima(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
