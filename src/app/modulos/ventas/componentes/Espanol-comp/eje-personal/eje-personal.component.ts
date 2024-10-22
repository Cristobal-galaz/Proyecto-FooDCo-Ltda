import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../Service/conexion/conexion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eje-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eje-personal.component.html',
  styleUrls: ['./eje-personal.component.scss']
})
export class EjePersonalComponent implements OnInit {
  message: string | null = null;
  isEnglish: boolean = false;  // Nueva propiedad para manejar el idioma

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = '¡El botón en el componente Personal fue clickeado!';
    });
    
    // Establecer el idioma inicial basado en la URL
    this.isEnglish = this.router.url.includes('-en');
  }

  sendNotification() {
    this.conexionService.notifyButtonClicked();
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

  toggleLanguage() {
    const currentUrl = this.router.url;
    
    // Cambiar la URL y el valor de isEnglish
    if (currentUrl.includes('-en')) {
      this.router.navigate([currentUrl.replace('-en', '')]);
      this.isEnglish = false;
    } else {
      this.router.navigate([`${currentUrl}-en`]);
      this.isEnglish = true;
    }
  }
}
