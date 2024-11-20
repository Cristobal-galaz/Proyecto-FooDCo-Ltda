import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Factura } from '../interfaces/factura'
import { ValoracionService } from './valoracion.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHistorialComprasService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private valoracionService: ValoracionService) {}

  getPedidos(userId: string, estados: string[]): Observable<any[]> {
    const estadoQuery = estados.join(',');

    return this.http.get<any[]>(`${this.apiUrl}orden-compra/list/cliente/${userId}?estado=${estadoQuery}`).pipe(
      switchMap((pedidos) => {
        // Procesar pedidos con valoraciones
        const pedidosConValoracion = pedidos.map((pedido) => {
          return this.valoracionService.getValoracion(pedido._id).pipe(
            map((valoracion) => ({ ...pedido, valoracion }))
          );
        });
    
        return forkJoin(pedidosConValoracion).pipe(
          switchMap((pedidosValorados) => {
            // Procesar pedidos con facturas
            const pedidosConFactura = pedidosValorados.map((pedido) => {
              return this.getFacturasPorCliente(userId).pipe(
                map((facturas) => {
                  const factura = facturas.find((f) => f.ordenCompra._id === pedido._id);
                  return { ...pedido, factura: factura ? factura.archivo : null };
                })
              );
            });
    
            return forkJoin(pedidosConFactura);
          }),
          catchError((error) => {
            console.error('Error al cargar los pedidos con valoración y facturas:', error);
            return of([]);
          })
        );
      }),
      catchError((error) => {
        console.error('Error al obtener la lista de pedidos:', error);
        return of([]);
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
