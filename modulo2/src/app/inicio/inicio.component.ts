import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../Service/conexion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  //template: `<p *ngIf="message">{{ message }}</p>`,
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  message: string | null = null;

  constructor(private conexionService: ConexionService) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = 'Button in Personal component was clicked!';
    });
  }
}
