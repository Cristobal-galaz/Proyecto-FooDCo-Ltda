import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    CommonModule // Asegúrate de incluir CommonModule aquí
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  user: any = null;
  isLogged: boolean = false;

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      const userRole = this.userService.getTypeUser();
      if(userRole === 'Empleado'){
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile(): void {
    // Obtener el ID del usuario
    const userId = this.userService.getIdUser();

    if (userId) {
      this.userService.getEmpleadoProfile(userId).subscribe(
        (data) => {
          this.user = data;
          console.log('Perfil del usuario cargado:', this.user);
        },
        (error) => {
          console.error('Error al cargar el perfil del usuario:', error);
        }
      );
    } else {
      console.log('No se encontró el ID del usuario');
    }
  }

  AbrirVentana(){
    const newWindow = window.open('login',"_blank", "popup,width=850,height=800,left=100,top=100");
    if (newWindow) {
      const checkWindowClosed = setInterval(()=> {
        if(newWindow.closed){
          clearInterval(checkWindowClosed);
          window.location.reload();
        }
      }, 1000);
    } else {
      console.error('No se pudo abrir la nueva ventana');
    }

  }

  logout() {
    this.auth.logout();
  }
}
