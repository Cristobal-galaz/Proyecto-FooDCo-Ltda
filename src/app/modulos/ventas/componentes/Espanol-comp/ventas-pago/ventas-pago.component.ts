import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../Service/apiservice.service';

@Component({
  selector: 'app-ventas-pago',
  templateUrl: './ventas-pago.component.html',
  styleUrls: ['./ventas-pago.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class VentasPagoComponent {
  orders: any[] = []; // Array para almacenar las órdenes completas
  filteredOrders: any[] = []; // Array para almacenar las órdenes filtradas
  activeButton: number | null = null; // Estado del botón activo

  constructor(
    private router: Router,
    private apiService: ApiserviceService
  ) {
    this.loadCuotas(); // Llamada inicial para cargar las órdenes
  }

  // Función que se ejecuta cuando un botón es presionado
  setActiveButton(buttonNumber: number): void {
    this.activeButton = buttonNumber;
    console.log(`Botón ${buttonNumber} activado`);
    this.filterOrders(); // Filtra las órdenes según el estado del botón
  }

  // Función para filtrar las órdenes
  filterOrders(): void {
    if (this.activeButton === 1) {
      // Filtra las órdenes con cuotas por pagar
      this.filteredOrders = this.orders.filter(order => order.detallesCuotas.cuotasPorPagar > 0);
    } else if (this.activeButton === 2) {
      // Filtra las órdenes completadas (sin cuotas por pagar)
      this.filteredOrders = this.orders.filter(order => order.detallesCuotas.cuotasPorPagar === 0);
    } else {
      // Si no hay filtro, muestra todas las órdenes
      this.filteredOrders = this.orders;
    }
  }

  // Llamada al servicio para cargar las órdenes y cuotas
  loadCuotas(): void {
    this.apiService.getCuotasPorOrdenes().subscribe(
      (cuotas) => {
        // Asigna los datos de las cuotas a las órdenes
        this.orders = cuotas.map((cuota) => ({
          username: cuota.cliente.username,
          email: cuota.cliente.email, // Email del cliente
          numeroOrden: cuota.numeroOrden,
          detallesCuotas: cuota.detallesCuotas,
        }));

        // Filtra las órdenes después de cargarlas
        this.filterOrders();
        console.log('Órdenes obtenidas:', this.filteredOrders);
      },
      (error) => {
        console.error('Error al obtener las cuotas:', error);
      }
    );
  }

  toggleVisibility(order: any): void {
    order.isVisible = !order.isVisible;
  }
}
