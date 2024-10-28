import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../Service/conexion/conexion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal.component.html', 
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  message: string | null = null;
  isEnglish: boolean = false; // Propiedad para manejar el idioma

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = this.isEnglish ? 'Button in Personal component was clicked!' : '¡Botón en el componente Personal fue clicado!';
    });
  }

  sendNotification() {
    this.conexionService.notifyButtonClicked();
  }
  
  goToHome() {
    this.router.navigate(['/home']);  // Navega al componente de Inicio
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish; // Alterna el idioma
  }
}
