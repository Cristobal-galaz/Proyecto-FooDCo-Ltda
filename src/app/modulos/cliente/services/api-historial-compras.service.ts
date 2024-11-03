// src/app/services/purchase-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, throwError} from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ApiHistorialComprasService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPedidosAll(userId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}orden-compra/list/cliente/${userId}`);
    }

    getPedidos(userId: string, estados: string[]): Observable<any[]> {
        const estadoQuery = estados.join(',');

        return this.http.get<any[]>(`${this.apiUrl}orden-compra/list/cliente/${userId}?estado=${estadoQuery}`).pipe(
            switchMap(pedidos => {
                // Para cada pedido, verifica si tiene una factura asociada
                const pedidosConFactura$ = pedidos.map(pedido =>
                    this.checkFactura(pedido._id).pipe(
                        map(archivo => ({
                            ...pedido,
                            factura: archivo  // Agrega el archivo de la factura si existe, o null si no
                        })),
                        catchError(() => of({ ...pedido, factura: null })) // Si hay un error, agrega null en factura
                    )
                );
                // Espera a que todas las verificaciones de factura estén completas antes de devolver
                return forkJoin(pedidosConFactura$);
            })
        );
    }

    // Método auxiliar para verificar si un pedido tiene factura y devolver solo el archivo
    private checkFactura(pedidoId: string): Observable<any | null> {
        return this.http.get<any>(`${this.apiUrl}factura/orden/${pedidoId}`).pipe(
            map(response => response?.factura.archivo || null),  // Devuelve solo 'archivo' si existe, o null si no
            catchError(error => {
                if (error.status === 404) {
                    return of(null);
                } else {
                    // Si es otro tipo de error, lanza el error para manejarlo en otro lugar
                    return throwError(error);
                }
            })
        );
    }
}

