import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setValoracion(valoracion: any) {
    const respuestas = valoracion.respuestas;
  
    const valoracionFormatted = {
      foodQuality: respuestas[0]?.respuesta || 0,
      menuVariety: respuestas[1]?.respuesta || 0,
      deliveryTime: respuestas[2]?.respuesta || 0,
      staffFriendliness: respuestas[3]?.respuesta || 0,
      cleanliness: respuestas[4]?.respuesta || 0,
      specialRequests: respuestas[5]?.respuesta || 0,
      valueForMoney: respuestas[6]?.respuesta || 0,
      easeOfContact: respuestas[7]?.respuesta || 0,
      creativity: respuestas[8]?.respuesta || 0,
      overallSatisfaction: respuestas[9]?.respuesta || 0,
      comentario: valoracion.comentario || "Sin comentarios", // Usar el comentario recibido
      ordenCompra: valoracion.ordenCompra
    };
  
    // Imprime los datos que se enviarán al backend
    console.log("Datos enviados al backend:", valoracionFormatted);
  
    // Envía los datos al servidor
    return this.http.post(`${this.apiUrl}review/create`, valoracionFormatted);
  }

  getValoracion(id: string) {
    return this.http.get(`${this.apiUrl}review/list`).pipe(
      switchMap((res: any) => {
        // Busca el objeto que coincide con la orden de compra
        const item = res.find((item: any) => item.ordenCompra === id);
  
        if (item) {
          // Si existe, realiza la segunda solicitud
          return this.http.get(`${this.apiUrl}review/orden-compra/${id}`).pipe(
            map((response) => ({ success: true, data: response }))
          );
        } else {
          // Si no existe, devuelve un valor falso
          return of({ success: false });
        }
      }),
      catchError((error) => {
        console.error('Error al obtener la valoración:', error);
        return of({ success: false });
      })
    );
  }
}
