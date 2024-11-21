import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../Service/apiservice.service';
import { OrdenCompra } from '../../../interface/ordendecompra';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
  imports: [CommonModule, FormsModule],
})

export class OrdenCompraComponent implements OnInit {
  orden!: OrdenCompra; // Almacena la orden obtenida
  ordenId: string = ''; // Almacena el ID ingresado por el usuario

  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  // Cambiar idioma
  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }

  // Buscar la orden usando el ID ingresado por el usuario
  buscarOrden(): void {
    if (!this.ordenId.trim()) {
      alert('Por favor, ingresa un ID válido.');
      return;
    }

    // Llamar al servicio con el ID ingresado
    this.ordenCompra
      .getOrdenComprajefedeventa2(this.ordenId)
      .pipe(
        map((data: any) => {
          // Mapear la respuesta a la estructura de la interfaz
          return {
            _id: data._id,
            cliente: data.cliente,
            estado: data.estado,
            seleccionProductos: data.seleccionProductos,
            precioTotalOrden: data.precioTotalOrden,
            iva: data.iva,
            precioFinalConIva: data.precioFinalConIva,
          } as OrdenCompra;
        })
      )
      .subscribe(
        (ordenCompra: OrdenCompra) => {
          this.orden = ordenCompra; // Guardar los datos de la orden
          console.log('Orden cargada:', this.orden);
        },
        (error) => {
          console.error('Error al cargar la orden de compra:', error);
          alert('No se encontró una orden con ese ID.');
        }
      );
  }

  ngOnInit(): void {
    // Inicializaciones si son necesarias
  }
}

