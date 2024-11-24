import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido-aceptar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-aceptar.component.html',
  styleUrls: ['./pedido-aceptar.component.scss'],
})
export class PedidoAceptarComponent implements OnInit {
  ordenes: any[] = []; // Almacena las órdenes completas
  ordenesFiltradas: any[] = []; // Almacena las órdenes filtradas por estado
  estadoSeleccionado: string = 'todos'; // Estado inicial que muestra todas las órdenes

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    // Obtener todas las órdenes cuando se inicia el componente
    this.apiService.getOrdenCompra2().subscribe((data: any[]) => {
      this.ordenes = data; // Guardamos todas las órdenes
      this.ordenesFiltradas = [...this.ordenes]; // Mostrar todas inicialmente
    });
  }

  // Método para filtrar las órdenes por estado
  filtrarOrdenes() {
    if (this.estadoSeleccionado === 'todos') {
      this.ordenesFiltradas = [...this.ordenes]; // Mostrar todas
    } else {
      this.ordenesFiltradas = this.ordenes.filter(orden => orden.estado === this.estadoSeleccionado);
    }
  }

  // Métodos para cambiar el filtro de estado
  filtrarPendientes() {
    this.estadoSeleccionado = 'pendiente';
    this.filtrarOrdenes();
  }

  filtrarAprobadas() {
    this.estadoSeleccionado = 'aprobado';
    this.filtrarOrdenes();
  }

  filtrarRechazadas() {
    this.estadoSeleccionado = 'rechazado';
    this.filtrarOrdenes();
  }

  mostrarTodas() {
    this.estadoSeleccionado = 'todos';
    this.filtrarOrdenes();
  }
}
