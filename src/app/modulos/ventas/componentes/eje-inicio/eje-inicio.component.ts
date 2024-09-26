import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../Service/conexion/conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eje-inicio',
  standalone: true,
  imports: [],
  templateUrl: './eje-inicio.component.html',
  styleUrl: './eje-inicio.component.scss'
})
export class EjeInicioComponent implements OnInit{
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}
  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Eje-inicio component was clicked!';
    });
  }
  goToOrden() {
    this.router.navigate(['/orden']);  // Navega al componente de Inicio
  }


}

