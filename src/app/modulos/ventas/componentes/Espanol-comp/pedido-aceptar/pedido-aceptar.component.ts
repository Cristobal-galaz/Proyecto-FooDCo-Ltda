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
  mostrarSeccionModificar: boolean = false; // Controla la visibilidad de la sección para modificar estado
  nuevoEstado: string = 'pendiente'; // Estado seleccionado por el usuario
  ordenId: string = ''; // ID de la orden que se desea modificar
  empleadoId: string | null = null; // ID del empleado autenticado

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    // Obtener todas las órdenes al iniciar el componente
    this.apiService.getOrdenCompra2().subscribe((data: any[]) => {
      this.ordenes = data;
      this.ordenesFiltradas = [...this.ordenes]; // Mostrar todas las órdenes inicialmente
    });

    // Obtener el ID del empleado autenticado
    this.empleadoId = this.apiService.loadUserProfile();
  }

  // Método para filtrar las órdenes por estado
  filtrarOrdenes() {
    if (this.estadoSeleccionado === 'todos') {
      this.ordenesFiltradas = [...this.ordenes];
    } else {
      this.ordenesFiltradas = this.ordenes.filter(orden => orden.estado === this.estadoSeleccionado);
    }
  }

  // Métodos para cambiar el filtro de estado
  filtrarPendientes() {
    this.cerrarFormulario(); // Cerrar el formulario si está abierto
    this.estadoSeleccionado = 'pendiente';
    this.filtrarOrdenes();
  }

  filtrarAprobadas() {
    this.cerrarFormulario(); // Cerrar el formulario si está abierto
    this.estadoSeleccionado = 'aprobado';
    this.filtrarOrdenes();
  }

  filtrarRechazadas() {
    this.cerrarFormulario(); // Cerrar el formulario si está abierto
    this.estadoSeleccionado = 'rechazado';
    this.filtrarOrdenes();
  }

  mostrarTodas() {
    this.cerrarFormulario(); // Cerrar el formulario si está abierto
    this.estadoSeleccionado = 'todos';
    this.filtrarOrdenes();
  }

  // Método para mostrar el formulario y ocultar los filtros
  mostrarFormulario() {
    this.mostrarSeccionModificar = true;
  }

  // Método para ocultar el formulario
  cerrarFormulario() {
    this.mostrarSeccionModificar = false;
    this.ordenId = ''; // Limpia el ID ingresado
    this.nuevoEstado = 'pendiente'; // Restaura el estado inicial
  }

  // Método para actualizar el estado de una orden
  actualizarEstadoOrden() {
    if (!this.ordenId || !this.empleadoId) {
      alert('Debe ingresar un ID de orden válido y asegurarse de que el empleado esté autenticado.');
      return;
    }

    const url = `https://foodco.agroheladas.cl/api/v1/orden-compra/actualizar-estado/${this.ordenId}`;
    const payload = {
      nuevoEstado: this.nuevoEstado,
      empleadoId: this.empleadoId,
    };

    this.apiService.actualizarEstadoOrden(url, payload).subscribe(
      (response) => {
        alert('Estado de la orden actualizado correctamente.');
        this.cerrarFormulario(); // Ocultar el formulario después de la actualización
        this.filtrarOrdenes(); // Actualizar la lista de órdenes
      },
      (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('Hubo un error al actualizar el estado.');
      }
    );
  }
}
