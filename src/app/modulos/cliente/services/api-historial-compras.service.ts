import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Factura } from '../interfaces/factura'

@Injectable({
  providedIn: 'root'
})
export class ApiHistorialComprasService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPedidos(userId: string, estados: string[]): Observable<any[]> {
    const estadoQuery = estados.join(',');

    return this.http.get<any[]>(`${this.apiUrl}orden-compra/list/cliente/${userId}?estado=${estadoQuery}`).pipe(
      switchMap(pedidos => {
        // Obtiene las facturas solo si hay pedidos
        return this.getFacturasPorCliente(userId).pipe(
          map(facturas => {
            // Mapea cada pedido y le agrega la factura correspondiente si existe
            return pedidos.map(pedido => {
              const factura = facturas.find(f => f.ordenCompra._id === pedido._id);
              return {
                ...pedido,
                factura: factura ? factura.archivo : null // Agrega el archivo de la factura si existe, o null si no
              };
            });
          })
        );
      })
    );
  }

  // Método para obtener todas las facturas del cliente
  private getFacturasPorCliente(userId: string): Observable<Factura[]> {
    return this.http.get<{ facturas: Factura[] }>(`${this.apiUrl}factura/list`).pipe(
      map((response: { facturas: Factura[] }) => {
        // Filtrar solo las facturas del cliente especificado
        return response.facturas.filter((factura: Factura) => factura.cliente._id === userId);
      }),
      catchError(error => {
        console.error('Error fetching invoices:', error);
        return of([]); // Si ocurre un error, devolver un array vacío
      })
    );
  }
  
}
