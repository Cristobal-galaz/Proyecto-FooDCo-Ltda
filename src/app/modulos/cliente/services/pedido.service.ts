import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido'; // Nueva ruta de la interfaz Pedido

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://api.example.com/pedidos'; // Asegúrate de reemplazar con tu API real

  constructor(private http: HttpClient) {}

  getPedidosPorCliente(clienteId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}
