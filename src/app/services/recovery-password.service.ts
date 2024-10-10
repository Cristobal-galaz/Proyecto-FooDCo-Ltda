import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  private RecoveryKey = environment.apiUrl + "cliente/request-reset-password"
  private ResetKey = environment.apiUrl + "cliente/reset-password"
  constructor(private HttpClient: HttpClient, private router: Router) { }

  recovery(email: string): Observable<any>{
    return this.HttpClient.post<any>(this.RecoveryKey, {email})
  }
  resetPassword(email: string, resetCode: string, newPassword: string): Observable<any>{
    return this.HttpClient.post<any>(this.ResetKey, {email, resetCode, newPassword})
  }
}
