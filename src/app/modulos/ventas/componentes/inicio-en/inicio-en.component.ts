import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { ConexionService } from '../../Service/conexion/conexion.service';

@Component({
  selector: 'app-inicio-en',
  standalone: true,
  templateUrl: './inicio-en.component.html',
  styleUrls: ['./inicio-en.component.css'],
  imports: [CommonModule]  // Importa CommonModule aquí
})
export class InicioEnComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }

  goToPersonal() {
    this.router.navigate(['/personal']);
  }

  switchToSpanish() {
    this.router.navigate(['/inicio']);
  }
}
