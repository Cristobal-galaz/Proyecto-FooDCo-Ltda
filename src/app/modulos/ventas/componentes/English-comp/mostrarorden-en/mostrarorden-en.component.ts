import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../../../Service/conexion/conexion.service';

@Component({
  selector: 'app-mostrarorden-en',
  standalone: true,
  imports: [],
  templateUrl: './mostrarorden-en.component.html',
  styleUrls: ['./mostrarorden-en.component.css']
})
export class MostrarordenEnComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }

  goToOrden() {
    // Redirigir a la versión en inglés de la orden de compra
    this.router.navigate(['/orden-compra-en']);
  }

  switchToSpanish() {
    // Redirigir a la versión en español de la orden de compra
    this.router.navigate(['/mostrarorden']);
  }
}
