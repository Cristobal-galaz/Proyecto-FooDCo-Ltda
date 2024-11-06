import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrdenDespacho } from '../interfaces/ordendespacho';
import { OrdenCompra } from '../../ventas/interface/ordendecompra';

@Injectable({
  providedIn: 'root',
})
export class DespachoService {
  private apiUrl = `${environment.apiUrl}/api/v1/despacho`;

  constructor(private http: HttpClient) {}

  // Método para obtener una orden de compra por ID
  getOrdenCompra(id: string): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(`${this.apiUrl}/orden-compra/${id}`);
  }

  // Método para crear una orden de despacho desde una orden de compra
  crearOrdenDespachoDesdeVenta(ordenCompra: OrdenCompra): Observable<OrdenDespacho> {
    const ordenDespacho = this.mapearOrdenCompraADespacho(ordenCompra);
    return this.http.post<OrdenDespacho>(`${this.apiUrl}/crear`, ordenDespacho);
  }

  // Método para obtener una orden de despacho por ID
  getOrdenDespacho(id: string): Observable<OrdenDespacho> {
    return this.http.get<OrdenDespacho>(`${this.apiUrl}/${id}`);
  }

    // Método para obtener todas las órdenes de despacho
    obtenerOrdenesDespacho(): Observable<OrdenDespacho[]> {
      return this.http.get<OrdenDespacho[]>(`${this.apiUrl}/list`);
    }  

  // Mapea una OrdenCompra a una OrdenDespacho
  private mapearOrdenCompraADespacho(ordenCompra: OrdenCompra): OrdenDespacho {
    return {
      _id: '',
      numero: Math.floor(Math.random() * 1e10),
      cliente: ordenCompra.cliente,
      estado: 'pendiente',
      fechaRequerida: ordenCompra.seleccionProductos.fechaRequerida,
      fecha: new Date(),
      ordenCompra: ordenCompra,
      historialEstados: [
        {
          estado: 'pendiente',
          fechaCambio: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}