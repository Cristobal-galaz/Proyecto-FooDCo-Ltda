import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto } from '../../models/tipo-producto.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private apiUrl = 'http://localhost:3000/tipos_producto';

  constructor(private http: HttpClient) { }

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl);
  }

  getTipoProductoById(id: string): Observable<TipoProducto> {
    return this.http.get<TipoProducto>(`${this.apiUrl}/${id}`);
  }

  addTipoProducto(tipoProducto: TipoProducto): Observable<TipoProducto> {
    return this.http.post<TipoProducto>(this.apiUrl, tipoProducto);
  }

  updateTipoProducto(id: string, tipoProducto: TipoProducto): Observable<TipoProducto> {
    return this.http.put<TipoProducto>(`${this.apiUrl}/${id}`, tipoProducto);
  }

  deleteTipoProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
