import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiMenusService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) {

   }

   getMenus(){
    return this.http.get<[]>(`${this.apiUrl}/menu/list/true`);
  }
}
