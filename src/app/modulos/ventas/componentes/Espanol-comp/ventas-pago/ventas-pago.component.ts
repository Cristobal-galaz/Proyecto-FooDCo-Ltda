import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-ventas-pago',
  templateUrl: './ventas-pago.component.html',
  styleUrls: ['./ventas-pago.component.scss'],
  standalone: true,
  imports: [CommonModule,MatExpansionModule],
})
export class VentasPagoComponent {
  orders: any[] = [];
  filteredOrders: any[] = [];
  activeButton: number | null = null;
  idioma: string = 'es'; // Idioma actual
  panelOpenState: boolean = true;



  constructor(private router: Router, private apiService: ApiserviceService) {
    this.loadCuotas();
  }

  // Cambiar idioma entre español e inglés
  cambiarIdioma(): void {
    this.idioma = this.idioma === 'es' ? 'en' : 'es';
  }

  setActiveButton(buttonNumber: number): void {
    this.activeButton = buttonNumber;
    this.filterOrders();
  }

  filterOrders(): void {
    if (this.activeButton === 1) {
      this.filteredOrders = this.orders.filter(
        (order) => order.detallesCuotas.cuotasPorPagar > 0
      );
    } else if (this.activeButton === 2) {
      this.filteredOrders = this.orders.filter(
        (order) => order.detallesCuotas.cuotasPorPagar === 0
      );
    } else {
      this.filteredOrders = this.orders;
    }
  }

  loadCuotas(): void {
    this.apiService.getCuotasPorOrdenes().subscribe(
      (cuotas) => {
        this.orders = cuotas.map((cuota) => ({
          username: cuota.cliente.username,
          email: cuota.cliente.email,
          numeroOrden: cuota.numeroOrden,
          detallesCuotas: cuota.detallesCuotas,
        }));
        this.filterOrders();
      },
      (error) => {
        console.error('Error al obtener las cuotas:', error);
      }
    );
  }

  toggleVisibility(order: any): void {
    order.isVisible = !order.isVisible;
  }

  // Formatear el estado de las cuotas
  formatEstado(estado: string): string {
    if (estado === 'por_pagar') {
      return this.idioma === 'es' ? 'Pago pendiente' : 'Pending payment';
    }
    return estado;
  }
}
