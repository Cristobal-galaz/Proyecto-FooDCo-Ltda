import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { OrdenCompra } from '../interface/ordendecompra';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiurl= environment.apiUrl;
  idjefedeventa:string='';
  constructor(private http:HttpClient,private user:UserService) { }


getOrdenCompra(){
  return this.http.get<[]>(`${this.apiurl}orden-compra/list`);
}
getOrdenComprajefedeventa(){

  //return this.http.get<[]>(`${this.apiurl}orden-compra/view/${this.user.getIdUser()}`);
  return this.http.get<any>(`${this.apiurl}orden-compra/view/670476cf9669bd78f83bdc77`);
}

getSubcontratos() {
  return this.http.get<{ subcontratos: any[] }>(`${this.apiurl}sub-contrato/list`);
}

getPersonal() {
  return this.http.get<{ personal: any[] }>(`${this.apiurl}auth/empleado/view/67200f241dc3f7bb3a32e903`);
}


}
