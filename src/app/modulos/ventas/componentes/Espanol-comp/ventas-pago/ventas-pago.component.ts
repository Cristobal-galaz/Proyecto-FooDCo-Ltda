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
  orders: any[] = []; // Array para almacenar los detalles de todas las órdenes
  activeButton: number | null = null;

  setActiveButton(buttonNumber: number): void {
    this.activeButton = buttonNumber;
    console.log(`Botón ${buttonNumber} activado`);
  }

  button1Action() {
    console.log('Botón 1 presionado');
  }
  
  button2Action() {
    console.log('Botón 2 presionado');
  }

  constructor(
    private router: Router,
    private apiService: ApiserviceService // Importa el servicio
  ) {
    // Realiza la llamada para obtener las cuotas
    this.loadCuotas();
  }

  // Cargar cuotas llamando al servicio
  loadCuotas(): void {
    this.apiService.getCuotasPorOrdenes().subscribe(
      (cuotas) => {
        // Asignar los valores necesarios para cada orden, incluyendo email y cuotas
        this.orders = cuotas.map((cuota) => ({
          username: cuota.cliente.username,
          email: cuota.cliente.email, // Agregar el email
          numeroOrden: cuota.numeroOrden,
          cuotas: cuota.detallesCuotas.listaCuotas.map((cuotaDetalle: any) => ({ // Usar `any`
            numeroCuota: cuotaDetalle.numeroCuota,
            estado: cuotaDetalle.estado,
            monto: cuotaDetalle.monto
          }))
        }));
  
        console.log('Órdenes obtenidas:', this.orders); // Depuración
      },
      (error) => {
        console.error('Error al obtener las cuotas:', error);
      }
    );
  }
  
}
