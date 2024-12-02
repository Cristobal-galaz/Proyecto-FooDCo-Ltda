import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  user: any = null;
  isLogged: boolean = false;
  selected = '';

  constructor(private auth: AuthService, private userService: UserService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLogged) => {
      this.isLogged = isLogged;
      this.initLanguage();
      const userRole = this.userService.getTypeUser();
      if(userRole === 'Empleado'){
        this.loadUserProfile();
      }
    });
  }

  initLanguage(): void {
    // Obtener el idioma actual o usar el predeterminado
    if (typeof window !== 'undefined' && localStorage) {
      const storedLang = localStorage.getItem('selectedLang');
      this.selected = storedLang || 'es'; // Idioma seleccionado
      this.translate.use(this.selected); // Usar el idioma seleccionado
    }
  }

  cambiarIdioma(lang: string): void {
    // Cambiar idioma dinámicamente
    this.translate.use(lang);
    this.selected = lang;

    // Almacenar el idioma en localStorage
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('selectedLang', lang);
    }
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
