import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  isChatOpen = false;

  campaigns = [
    {
      id: 1,
      name: 'Campaña 1',
      type: 'Radial',
      duration: 'HIGH',
      price: 700,
      date: '2024-08-14',
      managerImg: 'https://yt3.googleusercontent.com/...'
    },
    // Agrega más campañas aquí
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    const message = input.value.trim();
    if (event.key === 'Enter' && message) {
      // Lógica para enviar el mensaje
      input.value = '';
    }
  }

}
