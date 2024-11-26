import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../Service/apiservice.service';

@Component({
  selector: 'app-subcontratos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcontratos.component.html',
  styleUrls: ['./subcontratos.component.scss']
})
export class SubcontratosComponent implements OnInit {
  subcontratos: any[] = [];
  idioma: string = 'es'; // Idioma predeterminado (Español)

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

  // Método para cambiar el idioma
  cambiarIdioma() {
    this.idioma = this.idioma === 'es' ? 'en' : 'es';
  }
}
