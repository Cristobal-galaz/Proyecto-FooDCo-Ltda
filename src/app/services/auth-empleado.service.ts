import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthEmpleadoService {
  private LOGIN_URL = environment.apiUrl + 'auth/login/empleado' //cambiar esto por el de empleados
  private tokenKey = 'authToken'
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {email, password}).pipe(
      tap(response => {
        if (response.token){
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    )
  }
  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null{
    if(typeof window !=='undefined'){
      return localStorage.getItem(this.tokenKey);
    }else{
      return null;
    }
    
  }

  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    // TODO: Guardar id del payload
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}