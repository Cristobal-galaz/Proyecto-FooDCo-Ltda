import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../../services/user.service';

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
  return this.http.get<[]>(`${this.apiurl}orden-compra/view/${this.user.getIdUser()}`);
}


}