import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProduccionDiaria } from '../interfaces/produccion-diaria.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProduccionDiariaService {
  private apiUrl = `${environment.apiUrl}produccion-diaria`;

  constructor(private http: HttpClient) {}

  getProduccionDiaria(): Observable<ProduccionDiaria[]> {
    return this.http.get<ProduccionDiaria[]>(`${this.apiUrl}/list`);
  }

  getProduccionDiariaById(id: string): Observable<ProduccionDiaria> {
    return this.http.get<ProduccionDiaria>(`${this.apiUrl}/${id}`);
  }

  addProduccionDiaria(produccionDiaria: ProduccionDiaria): Observable<any> {
    return this.http.post<any>(this.apiUrl, produccionDiaria);
  }  

  updateProduccionDiaria(id: string, produccionDiaria: Partial<ProduccionDiaria>): Observable<ProduccionDiaria> {
    return this.http.put<ProduccionDiaria>(`${this.apiUrl}/update/${id}`, produccionDiaria);
  }

  deleteProduccionDiaria(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getResumenProduccionDiaria(fecha: string): Observable<{ tipo_producto: string; total: number }[]> {
    return this.getProduccionDiaria().pipe(
      map((producciones) => {
        const resumen: { [key: string]: number } = {};

        producciones.forEach(produccion => {
          const fechaProduccion = formatDate(new Date(produccion.fecha_produccion), 'MM/dd/yyyy', 'en-US');
          
          if (fechaProduccion === fecha) {
            const tipo = produccion.tipo_producto_id?.nombre || 'No especificado';
            resumen[tipo] = (resumen[tipo] || 0) + produccion.cantidad_producida;
          }
        });

        return Object.keys(resumen).map(tipo => ({
          tipo_producto: tipo,
          total: resumen[tipo]
        }));
      })
    );
  }
}
