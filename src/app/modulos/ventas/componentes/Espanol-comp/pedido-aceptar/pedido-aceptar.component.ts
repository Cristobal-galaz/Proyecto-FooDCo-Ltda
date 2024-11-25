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

  // Variables adicionales para la edición de cuotas
  mostrarSeccionCuotas: boolean = false; // Controla la visibilidad del formulario de cuotas
  ordenIdCuotas: string = ''; // Almacena el ID de la orden para editar las cuotas
  numeroDeCuotas: number = 1; // Almacena el número de cuotas

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
    this.mostrarSeccionCuotas = false; // Cerrar el formulario de cuotas
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

  // Método para mostrar el formulario de edición de cuotas
  mostrarFormularioCuotas() {
    this.mostrarSeccionCuotas = true;
    this.mostrarSeccionModificar = false; // Cerrar el formulario de estado
  }

  // Método para cerrar el formulario de edición de cuotas
  cerrarFormularioCuotas() {
    this.mostrarSeccionCuotas = false;
    this.ordenIdCuotas = ''; // Limpiar el campo de ID
    this.numeroDeCuotas = 1; // Restaurar el valor inicial de cuotas
  }

  // Método para actualizar las cuotas de una orden
  actualizarCuotas() {
    if (!this.ordenIdCuotas || !this.numeroDeCuotas || this.numeroDeCuotas <= 0) {
      alert('Debe ingresar un ID de orden válido y un número de cuotas.');
      return;
    }

    const url = `https://foodco.agroheladas.cl/api/v1/orden-compra/${this.ordenIdCuotas}/cuotas`;
    const payload = {
      numeroDeCuotas: this.numeroDeCuotas,
    };

    this.apiService.actualizarCuotasOrden(url, payload).subscribe(
      (response) => {
        alert('Cuotas de la orden actualizadas correctamente.');
        this.cerrarFormularioCuotas(); // Ocultar el formulario después de la actualización
      },
      (error) => {
        console.error('Error al actualizar las cuotas:', error);
        alert('Hubo un error al actualizar las cuotas.');
      }
    );
  }

  botonActivo: string = ''; // Variable para rastrear el botón activo

  seleccionarBoton(boton: string) {
    this.botonActivo = boton; // Establece el botón activo según el clic
  }

  esActivo(boton: string): boolean {
    return this.botonActivo === boton; // Devuelve true si el botón está activo
  }

}
