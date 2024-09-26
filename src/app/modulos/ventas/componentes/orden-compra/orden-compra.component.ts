import { Component } from '@angular/core';

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  imports: [],
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent {
  isEnglish: boolean = false; // Controlador del idioma

  toggleLanguage() {
    this.isEnglish = !this.isEnglish; // Cambia entre inglés y español
  }
}
