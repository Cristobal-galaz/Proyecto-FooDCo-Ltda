import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ApiserviceService } from '../../../Service/apiservice.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-eje-personal',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './eje-personal.component.html',
  styleUrls: ['./eje-personal.component.scss']
})
export class EjePersonalComponent implements OnInit {
  personal: any = null; // Cambia a un único objeto
  language: string | null = 'es'; // Añadido para el cambio de idioma

  constructor(private apiService: ApiserviceService, private traducir:TranslateService) {}

  ngOnInit() {
    this.cargarPersonal();
    //this.language = localStorage.getItem("selectedLang");
    this.traducir.onLangChange.subscribe((event) => {
      console.log('Idioma cambiado a:', event.lang);
      this.language = event.lang;
    });
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
