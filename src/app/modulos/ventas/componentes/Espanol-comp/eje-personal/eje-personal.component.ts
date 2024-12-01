import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ApiserviceService } from '../../../Service/apiservice.service';

@Component({
  selector: 'app-eje-personal',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './eje-personal.component.html',
  styleUrls: ['./eje-personal.component.scss']
})
export class EjePersonalComponent implements OnInit {
  personal: any = null; // Cambia a un único objeto
  language: string = 'es'; // Añadido para el cambio de idioma

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.cargarPersonal();
  }

  cargarPersonal() {
    this.apiService.getPersonal().subscribe({
      next: (data) => {
        //console.log('Respuesta de la API:', data); // Inspecciona la respuesta
        this.personal = data; // Asigna directamente el objeto
      },
      error: (err) => {
        console.error('Error al cargar datos del personal:', err);
      }
    });
  }

  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
  }
}
