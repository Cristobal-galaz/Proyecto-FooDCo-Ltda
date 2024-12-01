import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subcontratos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcontratos.component.html',
  styleUrls: ['./subcontratos.component.scss']
})
export class SubcontratosComponent implements OnInit {
  subcontratos: any[] = [];
  idioma: string | null = 'es'; // Idioma predeterminado (Español)

  constructor(private apiService: ApiserviceService, private traducir:TranslateService) {}

  ngOnInit() {
    this.cargarSubcontratos();
    this.traducir.onLangChange.subscribe((event) => {
      console.log('Idioma cambiado a:', event.lang);
      this.idioma = event.lang;
    });
    //this.idioma = localStorage.getItem("selectedLang");
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
