import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProduccionDiaria } from '../interfaces/produccion-diaria.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionDiariaService {
  private apiUrl = `${environment.apiUrl}produccion-diaria`;

  constructor(private http: HttpClient) {}

  getProduccionDiaria(): Observable<ProduccionDiaria[]> {
    return this.http.get<ProduccionDiaria[]>(`${this.apiUrl}/list`);
  }

  getProduccionDiariaById(id: string): Observable<ProduccionDiaria> {
    return this.http.get<ProduccionDiaria>(`${this.apiUrl}/${id}`);
  }

  addProduccionDiaria(produccionDiaria: ProduccionDiaria): Observable<ProduccionDiaria> {
    return this.http.post<ProduccionDiaria>(this.apiUrl, produccionDiaria);
  }

  updateProduccionDiaria(id: string, produccionDiaria: Partial<ProduccionDiaria>): Observable<ProduccionDiaria> {
    return this.http.put<ProduccionDiaria>(`${this.apiUrl}/update/${id}`, produccionDiaria);
  }

  deleteProduccionDiaria(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
