import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  apiUrl = environment.apiUrl; // URL de tu API

  constructor(private http: HttpClient) { }

  getRubros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"rubro/list/");
  }
}
