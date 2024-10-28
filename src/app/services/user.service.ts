import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private auth: AuthService ) { }


  getIdUser(): string | null { 
    const token = this.auth.getToken();
    if (!token){
      return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.id;
    
  }

  getRolUser(): string | null { 
    const token = this.auth.getToken();
    if (!token){
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    if (payload.type === 'cliente'){
      return payload.type;
    }
    return payload.role;
    
  }
}
