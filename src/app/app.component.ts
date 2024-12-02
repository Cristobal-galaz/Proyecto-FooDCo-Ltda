import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { FooterComponent } from './core/footer/footer.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule, FooterComponent, NavBarComponent, MatButtonModule, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Proyecto-FooDCo-Ltda';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);

    // Verificar si estamos en un entorno del navegador
    if (typeof window !== 'undefined' && localStorage) {
      // Obtener el idioma almacenado en localStorage
      const storedLang = localStorage.getItem('selectedLang');

      if (storedLang) {
        // Si existe un idioma guardado, usarlo
        this.translate.use(storedLang);
      } else {
        // Si no existe, obtener el idioma del navegador
        const browserLang = this.translate.getBrowserLang() ?? 'es'; // Aseguramos un valor por defecto
        const selectedLang = ['en', 'es'].includes(browserLang) ? browserLang : 'es';

        // Establecer el idioma y guardarlo en localStorage
        this.translate.use(selectedLang);
        localStorage.setItem('selectedLang', selectedLang);
      }
    } else {
      // Fallback: establecer un idioma predeterminado
      this.translate.use('es');
    }
  }

    
  
}
