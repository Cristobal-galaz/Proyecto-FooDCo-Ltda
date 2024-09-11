import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiMenusService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) {

   }

   getMenus(){
    return this.http.get<[]>(`${this.apiUrl}menu/list/true`);
  }

  sendOrdenCompra(ordenCompra: any){
    this.http.post(this.apiUrl+"seleccion-productos/new",ordenCompra).
    subscribe(response => {
      console.log('Registro exitoso', response);
    }, error => {
      console.error('Error en el registro', error);
    });
  }
}
