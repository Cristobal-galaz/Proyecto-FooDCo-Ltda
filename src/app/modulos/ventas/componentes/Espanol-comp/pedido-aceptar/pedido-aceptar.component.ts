import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido-aceptar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-aceptar.component.html',
  styleUrls: ['./pedido-aceptar.component.scss'],
})
export class PedidoAceptarComponent {
  // Declaración de 'quota' como propiedad opcional
  data: { name: string; quota?: string }[] = [
    { name: 'Pedido 1' },
    { name: 'Pedido 2' },
    { name: 'Pedido 3' }
  ];

  // Propiedad para el idioma actual
  language: string = 'es';

  toggleLanguage(): void {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  accept(item: any): void {
    console.log(this.language === 'es' ? 'Aceptado:' : 'Accepted:', item);
    this.data = this.data.filter(d => d !== item);
  }

  reject(item: any): void {
    console.log(this.language === 'es' ? 'Rechazado:' : 'Rejected:', item);
    this.data = this.data.filter(d => d !== item);
  }
}
