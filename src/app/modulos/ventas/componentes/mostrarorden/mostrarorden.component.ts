import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../Service/conexion/conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrarorden',
  standalone: true,
  imports: [],
  templateUrl: './mostrarorden.component.html',
  styleUrl: './mostrarorden.component.css'
})
export class MostrarordenComponent implements OnInit{
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }
  goToOrden() {
    this.router.navigate(['/orden']);  // Navega al componente de Inicio
  }

}
