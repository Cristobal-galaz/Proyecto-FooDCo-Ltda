import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DespachoService } from '../../services/despacho.service';
import { FormsModule } from '@angular/forms';
import { OrdenDespacho } from '../../interfaces/ordendespacho';
import { OrdenCompra } from '../../../ventas/interface/ordendecompra';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule ,MatProgressSpinnerModule, MatListModule],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.scss'
})

export class SeguimientoComponent implements OnInit {
  idSeguimiento: string = ''; // ID ingresado por el usuario
  orden: OrdenDespacho | null = null; // Orden filtrada
  mensajeError: string = ''; // Mensaje de error

  constructor(private despachoService: DespachoService) {}

  ngOnInit(): void {}

  verificarSeguimiento(): void {
    // Limpiar resultados previos
    this.orden = null;
    this.mensajeError = '';

    // Validar que el ID no esté vacío
    if (!this.idSeguimiento.trim()) {
      this.mensajeError = 'Por favor, ingrese un ID válido.';
      return;
    }

    // Consultar el servicio para obtener la orden por ID
    this.despachoService.getOrdenDespacho(this.idSeguimiento).subscribe({
      next: (data) => {
        this.orden = data; // Asigna la orden obtenida
      },
      error: () => {
        this.mensajeError = 'No se encontró la orden de despacho con el ID proporcionado.';
      },
    });
  }
}