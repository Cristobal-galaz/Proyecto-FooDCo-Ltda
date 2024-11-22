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
  ordenes: OrdenCompra[] = []; // Almacena las órdenes obtenidas

  constructor(private router: Router, private ordenCompra: ApiserviceService) {}

  // Cambiar idioma
  switchToEnglish() {
    this.router.navigate(['/orden-compra-en']);
  }

  // Buscar todas las órdenes del usuario
  obtenerOrdenes(): void {
    this.ordenCompra.getOrdenPorUsuario().pipe(
      map((data: any) => {
        return data.map((orden: any) => {
          // Mapear cada orden de la respuesta a la estructura de la interfaz
          return {
            _id: orden._id,
            cliente: orden.cliente,
            estado: orden.estado,
            seleccionProductos: orden.seleccionProductos,
            precioTotalOrden: orden.precioTotalOrden,
            iva: orden.iva,
            precioFinalConIva: orden.precioFinalConIva,
          } as OrdenCompra;
        });
      })
    ).subscribe(
      (ordenes: OrdenCompra[]) => {
        this.ordenes = ordenes; // Guardar las órdenes recibidas
        console.log('Órdenes cargadas:', this.ordenes);
      },
      (error) => {
        console.error('Error al cargar las órdenes de compra:', error);
        alert('No se encontraron órdenes.');
      }
    );
  }

  ngOnInit(): void {
    // Obtener las órdenes al inicializar el componente
    this.obtenerOrdenes();
  }
}
