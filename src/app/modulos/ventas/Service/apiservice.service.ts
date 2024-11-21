import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { OrdenCompra } from '../interface/ordendecompra';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  apiurl = environment.apiUrl;
  idjefedeventa: string = '';

  constructor(private http: HttpClient, private user: UserService) {}

  private loadUserProfile(): string | null {
    const userId = this.user.getIdUser();
    if (!userId) {
      console.log('No se encontró el ID del usuario');
      return null;
    }
    // ESTO DEBE BORRARSE DESPUES
    console.log('Este es userID: ',userId)
    return userId;
  }


getOrdenCompra(){
  return this.http.get<[]>(`${this.apiurl}orden-compra/list`);
}
getOrdenComprajefedeventa(){

  //return this.http.get<[]>(`${this.apiurl}orden-compra/view/${this.user.getIdUser()}`);
  //return this.http.get<any>(`${this.apiurl}orden-compra/view/670476cf9669bd78f83bdc77`);
  return this.http.get<any>(`${this.apiurl}orden-compra/view/67200f241dc3f7bb3a32e903`);
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
      tap(data => {
        console.log('Respuesta de getDatosOrdenCompra:', data); // Mostrar los datos en consola
      })
    );
  }
  

  
}



