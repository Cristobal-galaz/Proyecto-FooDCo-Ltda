import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-pedido-aceptar',
  standalone: true,
  imports: [CommonModule, FormsModule,MatExpansionModule],
  templateUrl: './pedido-aceptar.component.html',
  styleUrls: ['./pedido-aceptar.component.scss'],
})
export class PedidoAceptarComponent implements OnInit {
  ordenes: any[] = [];
  ordenesFiltradas: any[] = [];
  estadoSeleccionado: string = 'todos';
  mostrarSeccionModificar: boolean = false;
  mostrarSeccionCuotas: boolean = false;
  ordenId: string = '';
  nuevoEstado: string = 'pendiente';
  empleadoId: string | null = null;
  ordenIdCuotas: string = '';
  numeroDeCuotas: number = 1;

  idioma: string | null = 'es'; // Idioma actual

  panelOpenState: boolean = true;


  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.apiService.getOrdenCompra2().subscribe((data: any[]) => {
      this.ordenes = data;
      this.ordenesFiltradas = [...this.ordenes];
    });
    this.empleadoId = this.apiService.loadUserProfile();
    this.idioma = localStorage.getItem("selectedLang");
  }

  cambiarIdioma() {
    this.idioma = this.idioma === 'es' ? 'en' : 'es';
    
  }

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

  filtrarOrdenes() {
    if (this.estadoSeleccionado === 'todos') {
      this.ordenesFiltradas = [...this.ordenes];
    } else {
      this.ordenesFiltradas = this.ordenes.filter(orden => orden.estado === this.estadoSeleccionado);
    }
  }

  mostrarFormulario() {
    this.mostrarSeccionModificar = true;
    this.mostrarSeccionCuotas = false;
  }

  cerrarFormulario() {
    this.mostrarSeccionModificar = false;
    this.ordenId = '';
    this.nuevoEstado = 'pendiente';
  }

  mostrarFormularioCuotas() {
    this.mostrarSeccionCuotas = true;
    this.mostrarSeccionModificar = false;
  }

  cerrarFormularioCuotas() {
    this.mostrarSeccionCuotas = false;
    this.ordenIdCuotas = '';
    this.numeroDeCuotas = 1;
  }

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


  // Método para mostrar el formulario de edición de cuotas


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
    return this.estadoSeleccionado === boton;
  }

  toggleVisibility(orden: any): void {
    orden.isVisible = !orden.isVisible;
  }
}
