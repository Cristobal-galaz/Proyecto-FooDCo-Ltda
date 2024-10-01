import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../../Service/conexion/conexion.service';

@Component({
  selector: 'app-mostrarorden',
  standalone: true,
  imports: [],
  templateUrl: './mostrarorden.component.html',
  styleUrls: ['./mostrarorden.component.css']
})
export class MostrarordenComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = '¡El botón en el componente Personal fue presionado!';
    });
  }

  goToOrden() {
    this.router.navigate(['/orden-compra']);
  }

  switchToEnglish() {
    this.router.navigate(['/mostrarorden-en']);
  }
}
