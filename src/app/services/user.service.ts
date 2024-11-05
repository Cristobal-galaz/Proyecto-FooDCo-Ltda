import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private auth: AuthService, private http: HttpClient) { }


  getIdUser(): string | null {
    const token = this.auth.getToken();
    if (!token) {
      return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.id;

  }

  getRolUser(): string | null {
    const token = this.auth.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.type === 'cliente') {
      return payload.type;
    }
    return payload.role;

  }

  getTypeUser(): string | null {
    const token = this.auth.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.type === 'cliente') {
      return payload.type;
    }
    return payload.type;
  }

  getEmpleadoProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}auth/empleado/view/${userId}`);
  }

}
