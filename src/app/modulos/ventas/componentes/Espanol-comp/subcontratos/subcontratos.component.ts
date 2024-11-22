import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ApiserviceService } from '../../../Service/apiservice.service';

@Component({
  selector: 'app-subcontratos',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './subcontratos.component.html',
  styleUrls: ['./subcontratos.component.scss']
})
export class SubcontratosComponent implements OnInit {
  subcontratos: any[] = [];

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.cargarSubcontratos();
  }

  cargarSubcontratos() {
    this.apiService.getSubcontratos().subscribe({
      next: (data) => {
        this.subcontratos = data.subcontratos;
      },
      error: (err) => {
        console.error('Error al cargar subcontratos:', err);
      }
    });
  }
}
