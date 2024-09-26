import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../Service/conexion/conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrarorden',
  standalone: true,
  imports: [],
  templateUrl: './mostrarorden.component.html',
  styleUrls: ['./mostrarorden.component.css']
})
export class MostrarordenComponent implements OnInit {
  message: string | null = null;
  isEnglish: boolean = false; // Variable para controlar el idioma

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }

  goToOrden() {
    this.router.navigate(['/orden']);  // Navega al componente de inicio
  }

  toggleLanguage() {
    this.isEnglish = !this.isEnglish; // Cambia el idioma entre inglés y español
  }
}
