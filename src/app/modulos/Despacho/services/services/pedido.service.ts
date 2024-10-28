import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}pedidos`;

  constructor(private http: HttpClient) { }

  obtenerPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  asignarDespacho(pedidoId: string): Observable<any> {
    // Endpoint para asignar despacho al pedido
    const url = `${this.apiUrl}/${pedidoId}/asignar-despacho`;
    return this.http.post<any>(url, {});
  }
}