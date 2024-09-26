import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../Service/conexion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eje-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eje-personal.component.html', 
  //template: `<button (click)="sendNotification()">Click me</button>`,
  styleUrl: './eje-personal.component.scss'
})
export class EjePersonalComponent implements OnInit{
  message: string | null = null;

  constructor(private router: Router, private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }

  sendNotification() {
    this.conexionService.notifyButtonClicked();
  }
  goToInicio() {
    this.router.navigate(['/inicio']);  // Navega al componente de Inicio
  }

}
