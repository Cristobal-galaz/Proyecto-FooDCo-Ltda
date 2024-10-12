import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  private RecoveryKey = environment.apiUrl + "auth/cliente/request-reset-password"
  private ResetKey = environment.apiUrl + "auth/cliente/reset-password"
  constructor(private HttpClient: HttpClient, private router: Router) { }

  recovery(email: string): Observable<any>{
    this.setEmail(email)
    return this.HttpClient.post<any>(this.RecoveryKey, {email})
  }
  resetPassword(email: string, resetCode: string, newPassword: string): Observable<any>{
    return this.HttpClient.post<any>(this.ResetKey, {email, resetCode, newPassword})
  }

  private setEmail(email: string): void{
    localStorage.setItem("email", email)
  }

  public getEmail(): string| null{
    if(typeof window !=='undefined'){
      return localStorage.getItem("email");
    }else{
      return null;
    }
  }

}
