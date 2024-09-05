import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../Service/conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }
  goToInicio() {
    this.router.navigate(['/inicio']);  // Navega al componente de Inicio
  }
  goToMostrarOrden() {
    this.router.navigate(['/mostrarorden']);  // Navega al componente de Inicio
  }
}
