import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { OrdenCompra } from '../interface/ordendecompra';
import { map, switchMap, tap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  apiurl = environment.apiUrl;
  idjefedeventa: string = '';

  constructor(private http: HttpClient, private user: UserService) {}

  public loadUserProfile(): string | null {
    const userId = this.user.getIdUser();
    if (!userId) {
      //console.log('No se encontró el ID del usuario');
      return null;
    }
    // ESTO DEBE BORRARSE DESPUES
    //console.log('Este es userID: ',userId)
    return userId;
  }


getOrdenCompra(){
  return this.http.get<[]>(`${this.apiurl}orden-compra/list`);
}
getOrdenComprajefedeventa2(id: string) {
  return this.http.get<any>(`${this.apiurl}orden-compra/view/${id}`);
}
getOrdenComprajefedeventa(){

  //return this.http.get<[]>(`${this.apiurl}orden-compra/view/${this.user.getIdUser()}`);
  return this.http.get<any>(`${this.apiurl}orden-compra/view/670476cf9669bd78f83bdc77`);
  //return this.http.get<any>(`${this.apiurl}orden-compra/view/67200f241dc3f7bb3a32e903`);
}

getSubcontratos() {
  return this.http.get<{ subcontratos: any[] }>(`${this.apiurl}sub-contrato/list`);
}

  // Obtener el personal usando el userId dinámico
  getPersonal() {
    const userId = this.loadUserProfile();
    if (!userId) {
      throw new Error('No se puede obtener el ID del usuario');
    }
    return this.http.get<{ personal: any[] }>(`${this.apiurl}auth/empleado/view/${userId}`);
  }

  getDatosOrdenCompra() {
    return this.http.get<any>('https://foodco.agroheladas.cl/api/v1/orden-compra/list').pipe(
      //tap(data => {
      //  console.log('Respuesta de getDatosOrdenCompra:', data); // Mostrar los datos en consola
      //})
    );
  }
  getOrdenPorUsuario() {
    const userId = this.loadUserProfile();
    if (!userId) {
      throw new Error('No se puede obtener el ID del usuario para realizar la solicitud.');
    }
  
    // Llamar a getPersonal para asegurarse de que el userId es válido y obtener datos adicionales si es necesario
    return this.getPersonal().pipe(
      tap(personalData => {
        //console.log('Datos recibidos de getPersonal:', personalData); // Registro de los datos recibidos de getPersonal
        //console.log('Generando URL con userId:', userId); // Registro del userId usado en la URL
      }),
      // Realizar la solicitud con el userId dinámico
      switchMap(() => 
        this.http.get<any>(`${this.apiurl}orden-compra/list/empleado/${userId}`).pipe(
          //tap(response => {
            //console.log('Respuesta de GetOrdenPorUsuario:', response); // Registro de la respuesta recibida
          //})
        )
      )
    );
  }
  getCuotasPorOrdenes() {
    return this.getOrdenPorUsuario().pipe(
      map((ordenes: any[]) => ordenes.map(orden => orden._id)), // Extraer los IDs de las órdenes
      switchMap(ids => {
        if (ids.length === 0) {
          console.warn('No se encontraron órdenes para el usuario.');
          return of([]); // Retorna un array vacío si no hay órdenes
        }
        //console.log('IDs individuales:', ids); // Mostrar cada ID por separado en consola
  
        // Crear una llamada API para cada ID
        const requests = ids.map(id => {
          const url = `${this.apiurl}orden-compra/${id}/cuotas`;
          //console.log('URL individual construida:', url); // Mostrar cada URL individual en consola
          return this.http.get<any>(url); // Realizar la llamada para cada ID
        });
  
        // Ejecutar todas las llamadas en paralelo
        return forkJoin(requests);
      }),
      //tap(cuotas => {
        //console.log('Cuotas obtenidas para todos los IDs:', cuotas); // Mostrar cuotas en consola
      //})
    );
  }
  
getOrdenesPorPeriodo(periodo: string) {
  const validPeriodos = ['semanal', 'bisemanal', 'mensual', 'diario', 'trimestral', 'semestral'];
  if (!validPeriodos.includes(periodo)) {
    throw new Error(`Período inválido: ${periodo}`);
  }

  return this.http.get<OrdenCompra[]>(`${this.apiurl}orden-compra/list/periodo/${periodo}`).pipe(
    //tap((data) => console.log(`Órdenes obtenidas para el período ${periodo}:`, data))
  );
}

uploadFactura(formData: FormData): Observable<any> {
  const uploadUrl = `${this.apiurl}factura/upload`;
  return this.http.post<any>(uploadUrl, formData);
}
getOrdenesPorEstado(estado: string) {
  return this.http.get<OrdenCompra[]>(`${this.apiurl}orden-compra/list/estado/${estado}`).pipe(
    //tap((data) => console.log(`Órdenes obtenidas con estado ${estado}:`, data))
  );
}


getOrdenCompra2() {
  return this.http.get<[]>(`${this.apiurl}orden-compra/list`);
}



actualizarEstadoOrden(url: string, payload: { nuevoEstado: string; empleadoId: string }) {
  return this.http.put(url, payload);
}

actualizarCuotasOrden(url: string, payload: { numeroDeCuotas: number }) {
  return this.http.put(url, payload);
}

}



