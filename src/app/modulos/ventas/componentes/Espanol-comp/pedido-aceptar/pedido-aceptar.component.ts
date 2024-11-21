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

  accept(item: any): void {
    console.log('Aceptado:', item);
    this.data = this.data.filter(d => d !== item);
  }

  reject(item: any): void {
    console.log('Rechazado:', item);
    this.data = this.data.filter(d => d !== item);
  }
}
