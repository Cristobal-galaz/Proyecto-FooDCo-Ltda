import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TipoProducto } from '../interfaces/tipo-producto.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private apiUrl = `${environment.apiUrl}tipos-producto`;

  constructor(private http: HttpClient) {}

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(`${this.apiUrl}/list`);
  }

  getTipoProductoById(id: string): Observable<TipoProducto> {
    return this.http.get<TipoProducto>(`${this.apiUrl}/${id}`);
  }

  addTipoProducto(tipoProducto: TipoProducto): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(this.apiUrl, tipoProducto);
  }

  updateTipoProducto(id: string, tipoProducto: Partial<TipoProducto>): Observable<TipoProducto> {
    return this.http.put<TipoProducto>(`${this.apiUrl}/update/${id}`, tipoProducto);
  }

  deleteTipoProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
