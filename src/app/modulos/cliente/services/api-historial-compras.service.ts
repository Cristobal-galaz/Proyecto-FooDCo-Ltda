// src/app/services/purchase-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiHistorialComprasService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPurchaseHistory(userId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}orden-compra/list/cliente/${userId}`);
    }
}