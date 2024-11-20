import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-aceptar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-aceptar.component.html',
  styleUrl: './pedido-aceptar.component.scss'
})
export class PedidoAceptarComponent {
  data = [
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
