import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternService {

  constructor(private http:HttpClient) { }

  apiUrl = environment.apiUrl;


  sendContacMessage(form: any){
    return this.http.post<any>(`${this.apiUrl}formulario-contacto/new`, form)
    .subscribe(response => {
      console.log('Contacto enviado', response);
    }, error => {
      console.error('Error en el registro', error);
    });
  }

}
