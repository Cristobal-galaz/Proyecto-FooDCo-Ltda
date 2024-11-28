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

  idioma: string = 'es'; // Idioma actual

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.apiService.getOrdenCompra2().subscribe((data: any[]) => {
      this.ordenes = data;
      this.ordenesFiltradas = [...this.ordenes];
    });
    this.empleadoId = this.apiService.loadUserProfile();
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
    // Implementación del método
  }

  actualizarCuotas() {
    // Implementación del método
  }

  esActivo(boton: string): boolean {
    return this.estadoSeleccionado === boton;
  }

  toggleVisibility(orden: any): void {
    orden.isVisible = !orden.isVisible;
  }
}
