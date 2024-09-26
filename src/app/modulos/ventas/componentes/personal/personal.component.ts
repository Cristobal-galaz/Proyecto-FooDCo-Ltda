import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../Service/conexion/conexion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal.component.html', 
  //template: `<button (click)="sendNotification()">Click me</button>`,
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit{
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
