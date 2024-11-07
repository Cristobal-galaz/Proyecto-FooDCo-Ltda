import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Camion, OrdenDespacho } from '../interfaces/ordendespacho';

@Injectable({
  providedIn: 'root',
})
export class DespachoService {
  private apiUrl = `${environment.apiUrl}/orden-despacho`;

  constructor(private http: HttpClient) {}

  // Crear una orden de despacho a partir de una orden de compra
  crearOrdenDespacho(ordenCompraId: string): Observable<OrdenDespacho> {
    return this.http.post<OrdenDespacho>(`${this.apiUrl}/crear`, { ordenCompraId });
  }

  // Obtener una orden de despacho por ID
  getOrdenDespacho(id: string): Observable<OrdenDespacho> {
    return this.http.get<OrdenDespacho>(`https://foodco.agroheladas.cl/api/v1/orden-compra/view/${id}`);
  }

  // Asignar un camión a una orden de despacho
  asignarCamion(id: string, camion: Camion): Observable<any> {
    return this.http.put(`${this.apiUrl}orden-compra/${id}/camion`, { camion });
}

  // Actualizar el estado de una orden de despacho
  actualizarEstadoDespacho(id: string, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/estado`, { nuevoEstado });
  }

  // Obtener órdenes de compra listas para despacho
  obtenerOrdenesListasParaDespacho(): Observable<OrdenDespacho[]> {
    return this.http.get<OrdenDespacho[]>(`${environment.apiUrl}orden-compra/list/despacho`);
  }
  
}